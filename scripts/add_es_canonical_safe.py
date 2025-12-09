import os
import re
import argparse

def add_es_canonical(app_dir, target_file=None):
    updated_count = 0
    skipped_count = 0
    error_count = 0

    print(f"Scanning directory: {app_dir}")
    
    # Regex to capture the 'en' entry and subsequent lines to identify where to insert 'es'
    # It catches: 'en': getCanonicalUrl('calc-id', 'en'),
    # And makes sure 'es' is NOT already there
    
    # Logic:
    # 1. Read file
    # 2. Find the 'en' entry:  'en': getCanonicalUrl('
    # 3. Check if 'es' entry exists near it.
    # 4. If not, insert 'es' entry after 'en'.

    files_to_process = []
    
    if target_file:
         # precise path or filename matching
        if os.path.exists(target_file):
             files_to_process.append(target_file)
        else:
             # try finding it in app_dir
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

            # Find the 'en' line
            # Pattern: 'en': getCanonicalUrl('calculator-id', 'en'),
            # We capture the calculator id
            # Note: whitespace can vary slightly
            match = re.search(r"'en':\s*getCanonicalUrl\(\s*'([^']+)'\s*,\s*'en'\s*\),", content)
            
            if match:
                calculator_id = match.group(1)
                full_en_line = match.group(0) # The full string match
                
                # Check if 'es' is already present
                es_check = f"'es': getCanonicalUrl('{calculator_id}', 'es')"
                
                if es_check not in content:
                    # Construct the new line to insert
                    # Match indentation of the found line
                    # We can infer indentation by looking exclusively at the start of the line in the file
                    
                    # More robust replacement:
                    # Replace the 'en' line with 'en' line + newline + 'es' line
                    
                    # Find exact line in content to get indentation
                    lines = content.split('\n')
                    new_lines = []
                    modified = False
                    
                    for line in lines:
                        new_lines.append(line)
                        if full_en_line in line and not modified: 
                             # This is the line. Get leading whitespace
                             indentation = line[:line.find("'en'")]
                             new_es_line = f"{indentation}'es': getCanonicalUrl('{calculator_id}', 'es'),"
                             new_lines.append(new_es_line)
                             modified = True
                    
                    if modified:
                        new_content = "\n".join(new_lines)
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"[UPDATED] {file_path}")
                        updated_count += 1
                    else:
                         # fallback if line scan failed (unlikely if regex matched)
                         print(f"[ERROR] Could not insert in {file_path}")
                         error_count += 1
                else:
                    print(f"[SKIPPED] {file_path} (Already has 'es')")
                    skipped_count += 1
            else:
                 print(f"[SKIPPED] {file_path} (Could not find 'en' entry pattern)")
                 skipped_count += 1

        except Exception as e:
            print(f"[ERROR] processing {file_path}: {e}")
            error_count += 1

    print("\nSummary:")
    print(f"Updated: {updated_count} files")
    print(f"Skipped: {skipped_count} files")
    print(f"Errors:  {error_count} files")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Add Spanish canonical link to layout.tsx files.")
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
        add_es_canonical(app_dir, args.test_file)
    else:
        print("Could not find 'app' directory.")
