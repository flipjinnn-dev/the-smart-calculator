"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, RotateCcw, Upload, AlertCircle, CheckCircle2, Sparkles, ArrowRight, Table2, Eye, FileSpreadsheet, X } from "lucide-react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BankStatementConverterClientProps {
  content: any;
  guideContent: any;
}

export default function BankStatementConverterClient({ content, guideContent }: BankStatementConverterClientProps) {
  const guideData = guideContent || {
    color: 'green',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [inputText, setInputText] = useState("");
  const [outputCsv, setOutputCsv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [viewMode, setViewMode] = useState<'table' | 'csv'>('table');
  const [parsedData, setParsedData] = useState<any[]>([]);

  const detectDateFormat = (dateStr: string): string | null => {
    const formats = [
      { regex: /(\d{4})-(\d{2})-(\d{2})/, format: 'YYYY-MM-DD' },
      { regex: /(\d{2})\/(\d{2})\/(\d{4})/, format: 'DD/MM/YYYY' },
      { regex: /(\d{2})-(\d{2})-(\d{4})/, format: 'DD-MM-YYYY' },
      { regex: /(\d{2})\.(\d{2})\.(\d{4})/, format: 'DD.MM.YYYY' },
      { regex: /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i, format: 'DD Mon YYYY' },
    ];

    for (const { regex, format } of formats) {
      if (regex.test(dateStr)) {
        return format;
      }
    }
    return null;
  };

  const convertDateToISO = (dateStr: string, format: string): string => {
    try {
      dateStr = dateStr.trim();
      
      if (format === 'YYYY-MM-DD') {
        return dateStr;
      }
      
      if (format === 'DD/MM/YYYY') {
        const parts = dateStr.split('/');
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      
      if (format === 'DD-MM-YYYY') {
        const parts = dateStr.split('-');
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      
      if (format === 'DD.MM.YYYY') {
        const parts = dateStr.split('.');
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
      }
      
      if (format === 'DD Mon YYYY') {
        const monthMap: { [key: string]: string } = {
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
          'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
          'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        };
        const match = dateStr.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/i);
        if (match) {
          const day = match[1].padStart(2, '0');
          const month = monthMap[match[2].toLowerCase().substring(0, 3)];
          const year = match[3];
          return `${year}-${month}-${day}`;
        }
      }
      
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  const detectCurrency = (text: string): string => {
    const currencyPatterns = [
      { pattern: /PKR|Rs\.?|₨/, code: 'PKR' },
      { pattern: /USD|\$|US\$/, code: 'USD' },
      { pattern: /EUR|€/, code: 'EUR' },
      { pattern: /GBP|£/, code: 'GBP' },
      { pattern: /INR|₹/, code: 'INR' },
      { pattern: /JPY|¥/, code: 'JPY' },
      { pattern: /AUD|A\$/, code: 'AUD' },
      { pattern: /CAD|C\$/, code: 'CAD' },
      { pattern: /CHF/, code: 'CHF' },
      { pattern: /CNY|¥/, code: 'CNY' },
    ];

    for (const { pattern, code } of currencyPatterns) {
      if (pattern.test(text)) {
        return code;
      }
    }
    return 'UNKNOWN';
  };

  const cleanAmount = (amountStr: string): string => {
    return amountStr.replace(/[^\d.-]/g, '').trim();
  };

  const isValidAmount = (str: string): boolean => {
    const cleaned = cleanAmount(str);
    return cleaned !== '' && !isNaN(parseFloat(cleaned)) && parseFloat(cleaned) >= 0;
  };

  const splitByDelimiter = (line: string): string[] => {
    if (line.includes('\t')) {
      return line.split('\t').map(s => s.trim()).filter(s => s);
    }
    if (line.includes(',')) {
      const parts = line.split(',').map(s => s.trim()).filter(s => s);
      if (parts.length >= 3) return parts;
    }
    return line.split(/\s{2,}/).map(s => s.trim()).filter(s => s);
  };

  const parseTransaction = (line: string, dateFormat: string, currency: string, prevDate: string): any => {
    line = line.trim();
    if (!line || line.length < 10) return null;
    
    const dateRegex = /(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4})/;
    const dateMatch = line.match(dateRegex);
    
    if (!dateMatch) return null;
    
    let date = convertDateToISO(dateMatch[0], dateFormat);
    if (!date || date === dateMatch[0]) {
      date = prevDate || '';
    }
    if (!date) return null;
    
    const parts = splitByDelimiter(line);
    
    let description = '';
    let debit = '';
    let credit = '';
    let balance = '';
    
    const amounts: string[] = [];
    const nonAmounts: string[] = [];
    
    for (const part of parts) {
      if (part.match(dateRegex)) {
        continue;
      }
      
      if (isValidAmount(part)) {
        amounts.push(cleanAmount(part));
      } else {
        nonAmounts.push(part);
      }
    }
    
    description = nonAmounts.join(' ').replace(/\s+/g, ' ').trim();
    
    const lowerLine = line.toLowerCase();
    const hasDR = lowerLine.includes('dr') || lowerLine.includes('debit') || lowerLine.includes('withdrawal');
    const hasCR = lowerLine.includes('cr') || lowerLine.includes('credit') || lowerLine.includes('deposit');
    
    if (amounts.length >= 3) {
      debit = amounts[0];
      credit = amounts[1];
      balance = amounts[2];
    } else if (amounts.length === 2) {
      if (hasDR) {
        debit = amounts[0];
        balance = amounts[1];
      } else if (hasCR) {
        credit = amounts[0];
        balance = amounts[1];
      } else {
        const first = parseFloat(amounts[0]);
        const second = parseFloat(amounts[1]);
        if (second > first * 2) {
          credit = amounts[0];
          balance = amounts[1];
        } else if (first > second) {
          debit = amounts[0];
          balance = amounts[1];
        } else {
          credit = amounts[0];
          balance = amounts[1];
        }
      }
    } else if (amounts.length === 1) {
      if (hasDR) {
        debit = amounts[0];
      } else if (hasCR) {
        credit = amounts[0];
      } else {
        balance = amounts[0];
      }
    }
    
    if (!description && amounts.length > 0) {
      const afterDateIdx = line.indexOf(dateMatch[0]) + dateMatch[0].length;
      let textPart = line.substring(afterDateIdx);
      amounts.forEach(amt => {
        textPart = textPart.replace(new RegExp(amt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
      });
      textPart = textPart.replace(/DR|CR|Debit|Credit|Withdrawal|Deposit/gi, '');
      description = textPart.replace(/[,\s]+/g, ' ').trim();
    }
    
    if (!description) {
      description = 'Transaction';
    }
    
    return { date, description, debit, credit, balance, currency };
  };

  const convertStatement = () => {
    setError("");
    setSuccess(false);
    setProcessing(true);

    try {
      if (!inputText.trim()) {
        setError("Please paste your bank statement text");
        setProcessing(false);
        return;
      }

      let lines = inputText.split('\n').filter(line => line.trim());
      
      const currency = detectCurrency(inputText);
      
      let detectedDateFormat = '';
      const dateRegex = /(\d{1,2}[-/.]\d{1,2}[-/.]\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4})/;
      
      for (const line of lines.slice(0, 30)) {
        const match = line.match(dateRegex);
        if (match) {
          const format = detectDateFormat(match[0]);
          if (format) {
            detectedDateFormat = format;
            break;
          }
        }
      }

      if (!detectedDateFormat) {
        detectedDateFormat = 'DD/MM/YYYY';
      }

      const skipPatterns = [
        /^(date|transaction|particulars|description|narration|debit|credit|balance|amount|details|sl\.?\s*no)/i,
        /^(statement|account\s+(number|no)|customer|name|address|period|from|to)/i,
        /^(opening|closing|total|subtotal|grand\s*total|balance\s*(b\/f|c\/f|brought|carried))/i,
        /^page\s*\d+/i,
        /^-{3,}|={3,}|\*{3,}/,
        /^\s*$/,
        /^(continued|end\s*of|summary)/i
      ];

      const mergedLines: string[] = [];
      let currentLine = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        const shouldSkip = skipPatterns.some(pattern => pattern.test(line));
        if (shouldSkip) continue;
        
        if (line.length < 8) continue;
        
        const hasDate = dateRegex.test(line);
        
        if (hasDate) {
          if (currentLine) {
            mergedLines.push(currentLine.trim());
          }
          currentLine = line;
        } else {
          if (currentLine) {
            currentLine += ' ' + line;
          }
        }
      }
      
      if (currentLine) {
        mergedLines.push(currentLine.trim());
      }

      const transactions: any[] = [];
      let lastValidDate = '';

      for (const line of mergedLines) {
        try {
          const transaction = parseTransaction(line, detectedDateFormat, currency, lastValidDate);
          if (transaction && transaction.date) {
            transactions.push(transaction);
            lastValidDate = transaction.date;
          }
        } catch (err) {
          console.warn('Failed to parse transaction line:', line);
        }
      }

      if (transactions.length === 0) {
        setError("No transactions detected. Please ensure the statement contains valid transaction data with dates.");
        setProcessing(false);
        return;
      }

      let csv = 'Date,Description,Debit,Credit,Balance,Currency\n';
      transactions.forEach(t => {
        const cleanDesc = (t.description || 'Transaction').replace(/"/g, '""').replace(/[\r\n]/g, ' ');
        const debit = t.debit || '';
        const credit = t.credit || '';
        const balance = t.balance || '';
        csv += `${t.date},"${cleanDesc}",${debit},${credit},${balance},${t.currency}\n`;
      });

      setOutputCsv(csv);
      setParsedData(transactions);
      setSuccess(true);
      setProcessing(false);
      
      setTimeout(() => {
        if (resultsRef.current) {
          scrollToRef(resultsRef as React.RefObject<HTMLElement>);
        }
      }, 100);
    } catch (e) {
      console.error('Conversion error:', e);
      setError("An error occurred while processing the statement. Please check the format and try again.");
      setProcessing(false);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (typeof window === 'undefined') {
      throw new Error('PDF extraction is only available in the browser');
    }
    
    try {
      const pdfjs = await import('pdfjs-dist') as any;
      
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({
        data: arrayBuffer,
        verbosity: 0,
      });
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ')
          .replace(/\s+/g, ' ');
        fullText += pageText + '\n';
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF. Please try copying and pasting the text instead.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSuccess(false);
    setProcessing(true);

    try {
      let text = '';
      
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt') || 
                 file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')) {
        const reader = new FileReader();
        text = await new Promise<string>((resolve, reject) => {
          reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result === 'string') {
              resolve(result);
            } else {
              reject(new Error('Invalid file content'));
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsText(file);
        });
      } else {
        setError("Please upload a PDF, TXT, or CSV file.");
        setProcessing(false);
        return;
      }
      
      if (!text || text.trim().length === 0) {
        setError("The uploaded file appears to be empty. Please check the file and try again.");
        setProcessing(false);
        return;
      }
      
      setInputText(text);
      setUploadedFileName(file.name);
      setProcessing(false);
    } catch (error: any) {
      console.error('File upload error:', error);
      setError(error?.message || "Failed to read file. Please try again or copy/paste the text manually.");
      setProcessing(false);
    }
  };

  const downloadCSV = () => {
    const blob = new Blob([outputCsv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bank-statement-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInputText("");
    setOutputCsv("");
    setError("");
    setSuccess(false);
    setUploadedFileName("");
    setParsedData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCsv);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl">
                <FileText className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            {contentData.title || "Bank Statement Converter"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {contentData.description || "Transform any bank statement from any bank into clean CSV format. Upload PDF, Excel, or paste text - we handle it all!"}
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>PDF Upload Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>All Banks & Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>

        <Card className="mb-8 shadow-2xl border-0 pt-0 overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r py-4 from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Upload className="h-6 w-6" />
              </div>
              Upload Your Statement
            </CardTitle>
            <CardDescription className="text-green-50">
              Upload PDF, TXT, CSV files or paste text directly - all formats supported
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* File Upload Section */}
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={processing}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  {processing ? 'Processing...' : 'Upload File (PDF/TXT/CSV)'}
                </Button>
                
                {uploadedFileName && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{uploadedFileName}</span>
                    <button
                      onClick={() => {
                        setUploadedFileName("");
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span>Automatically extracts text from PDFs and processes all bank statement formats</span>
              </div>
            </div>

            {/* Text Input Section */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Or Paste Your Bank Statement Text
              </label>
              <div className="relative">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your bank statement here...&#10;&#10;Example:&#10;Date        Description              Debit    Credit   Balance&#10;01/01/2024  Opening Balance                            5000.00&#10;02/01/2024  ATM Withdrawal          500.00            4500.00&#10;03/01/2024  Salary Credit                   3000.00  7500.00"
                  className="min-h-[300px] font-mono text-sm border-2 border-gray-200 focus:border-green-500 rounded-lg shadow-sm bg-gray-50 resize-none"
                />
                {inputText && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {inputText.split('\n').filter(l => l.trim()).length} lines
                  </div>
                )}
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 font-medium">
                  ✓ Statement converted successfully! {parsedData.length} transactions processed.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={convertStatement}
                disabled={processing || !inputText.trim()}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex-1 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                <FileText className="h-5 w-5 mr-2" />
                {processing ? "Converting..." : "Convert to CSV"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:bg-gray-50 h-14 px-6"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {outputCsv && (
          <Card ref={resultsRef} className="mb-8 pt-0 shadow-2xl border-0 overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r py-4 from-green-600 to-emerald-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl mb-2">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    Success! Your CSV is Ready
                  </CardTitle>
                  <CardDescription className="text-green-50">
                    {parsedData.length} transactions converted successfully
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewMode('table')}
                    variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                    size="sm"
                    className={viewMode === 'table' ? 'bg-white/20 text-white hover:bg-white/30' : 'text-white hover:bg-white/10'}
                  >
                    <Table2 className="h-4 w-4 mr-2" />
                    Table
                  </Button>
                  <Button
                    onClick={() => setViewMode('csv')}
                    variant={viewMode === 'csv' ? 'secondary' : 'ghost'}
                    size="sm"
                    className={viewMode === 'csv' ? 'bg-white/20 text-white hover:bg-white/30' : 'text-white hover:bg-white/10'}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Table View */}
              {viewMode === 'table' && (
                <div className="overflow-x-auto rounded-lg border-2 border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-green-800 border-r border-green-200">Date</th>
                        <th className="px-4 py-3 text-left font-semibold text-green-800 border-r border-green-200">Description</th>
                        <th className="px-4 py-3 text-right font-semibold text-green-800 border-r border-green-200">Debit</th>
                        <th className="px-4 py-3 text-right font-semibold text-green-800 border-r border-green-200">Credit</th>
                        <th className="px-4 py-3 text-right font-semibold text-green-800 border-r border-green-200">Balance</th>
                        <th className="px-4 py-3 text-center font-semibold text-green-800">Currency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {parsedData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-green-50/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-100 whitespace-nowrap">{row.date}</td>
                          <td className="px-4 py-3 text-gray-700 border-r border-gray-100 max-w-md truncate" title={row.description}>{row.description}</td>
                          <td className="px-4 py-3 text-right font-mono text-red-600 border-r border-gray-100">{row.debit || '-'}</td>
                          <td className="px-4 py-3 text-right font-mono text-green-600 border-r border-gray-100">{row.credit || '-'}</td>
                          <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900 border-r border-gray-100">{row.balance || '-'}</td>
                          <td className="px-4 py-3 text-center text-gray-600 font-medium">{row.currency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CSV View */}
              {viewMode === 'csv' && (
                <div className="relative">
                  <Textarea
                    value={outputCsv}
                    readOnly
                    className="min-h-[400px] font-mono text-sm border-2 border-gray-200 bg-gray-50 rounded-lg shadow-sm resize-none"
                  />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    {parsedData.length} rows
                  </div>
                </div>
              )}

              {/* Export Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t-2 border-gray-100">
                <Button
                  onClick={downloadCSV}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download CSV File
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-600 text-green-700 hover:bg-green-50 h-14 text-lg font-semibold"
                >
                  <FileSpreadsheet className="h-5 w-5 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">{parsedData.length}</div>
                  <div className="text-xs text-gray-600 font-medium">Total Transactions</div>
                </div>
                <div className="text-center border-x border-green-200">
                  <div className="text-2xl font-bold text-red-600">{parsedData.filter(t => t.debit).length}</div>
                  <div className="text-xs text-gray-600 font-medium">Debits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{parsedData.filter(t => t.credit).length}</div>
                  <div className="text-xs text-gray-600 font-medium">Credits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      <SimilarCalculators calculators={[{
          calculatorName: "Loan Calculator",
          calculatorHref: "/financial/loan-calculator",
          calculatorDescription: "Calculate payments, interest, and amortization schedules"
        }, {
          calculatorName: "Payment Calculator",
          calculatorHref: "/financial/payment-calculator",
          calculatorDescription: "Calculate payments for various loan types"
        }, {
          calculatorName: "Interest Calculator",
          calculatorHref: "/financial/interest-calculator",
          calculatorDescription: "Calculate and compound interest on investments"
        }]} color="green" title="Related Financial Calculators" />
          {/* Calculator Guide */}
          <div className="mx-auto mt-12">
            
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="bank-statement-converter"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
          </div>
      </div>
    </div>
  );
}
