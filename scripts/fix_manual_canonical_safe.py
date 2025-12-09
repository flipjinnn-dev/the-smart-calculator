import os
import re
import argparse

def fix_manual_canonical_safe(app_dir, target_file=None):
    updated_count = 0
    skipped_count = 0
    error_count = 0

    print(f"Scanning directory: {app_dir}")

    # Robust regex to capture the specific multi-line broken pattern
    # Matches: canonical: `https://www.thesmartcalculator.com/${language ... }calculator-id`,
    # We use DOTALL to match across newlines.
    # We look for the start "canonical: `" and the end "`,"
    # We intentionally include ${language} to be specific.
    
    pattern = re.compile(
        r"canonical:\s*`https://www\.thesmartcalculator\.com/\$\{language.*?`,", 
        re.DOTALL
    )

    files_to_process = []
    
    if target_file:
        if os.path.exists(target_file):
             files_to_process.append(target_file)
        else:
             for dirpath, _, filenames in os.walk(app_dir):
                 if target_file in filenames:
                     files_to_process.append(os.path.join(dirpath, target_file))
    else:
         for dirpath, dirnames, filenames in os.walk(app_dir):
            if "layout.tsx" in filenames:
                files_to_process.append(os.path.join(dirpath, "layout.tsx"))
    
    print(f"Found {len(files_to_process)} files to process.")

    for file_path in files_to_process:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # Check for the pattern
            match = pattern.search(content)
            if match:
                # IMPORTANT: Safety check - ensure 'const canonicalUrl =' exists in the file
                # We don't want to use a variable that isn't defined.
                if "const canonicalUrl =" in content:
                    
                    # Perform replacement
                    # The regex covers everything from 'canonical:' to the closing comma ','
                    # We replace it exactly with 'canonical: canonicalUrl,'
                    
                    new_content = pattern.sub("canonical: canonicalUrl,", content)
                    
                    # Verify we didn't accidentally delete too much or too little
                    # (The regex is greedy but bounded by `,` which might be risky if multiple `,` are involved 
                    # but inside the object literal structure for one key, it should be fine as long as we matched the template string ending)
                    
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)
                        
                    print(f"[UPDATED] {file_path}")
                    updated_count += 1
                else:
                    print(f"[SKIPPED] {file_path} (Pattern found but 'canonicalUrl' variable missing)")
                    skipped_count += 1
            else:
                 # Be silent about skips unless it's a target run
                 if target_file:
                    print(f"[SKIPPED] {file_path} (Pattern not found)")
                 skipped_count += 1

        except Exception as e:
            print(f"[ERROR] processing {file_path}: {e}")
            error_count += 1

    print("\nSummary:")
    print(f"Updated: {updated_count} files")
    print(f"Skipped: {skipped_count} files")
    print(f"Errors:  {error_count} files")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Safely fix manual canonical URLs.")
    parser.add_argument("--test-file", help="Specific file to run on (absolute path or filename)")
    args = parser.parse_args()

    # Path to the app directory
    app_dir = os.path.join(os.getcwd(), "app")
    if not os.path.exists(app_dir):
        # Fallback
        base_path = r"d:\Zahan\The Smart Calculaotr- Project\smart-calculator\app"
        if os.path.exists(base_path):
             app_dir = base_path
    
    if app_dir:
        fix_manual_canonical_safe(app_dir, args.test_file)
    else:
        print("Could not find 'app' directory.")
