# parseSnb
The S-Pen has a fine handwriting recognizer, but the output format is uneditable. 
You can generate a JPEG or a PDF file, but the text in the PDF cannot be edited 
(using Master Pdf Editor). So if you want to add your notes to a wiki or an html 
file, you are out of luck. Combing the forums gave me the information that .snb
files were zip files. Unzipping showed that the text data was in the file 
snote/snote.xml. With that information plus modules _xml-stream_ and _unzip_
I created a small script to grab the text from the snb file and print it out.

## Installation
````npm install snb2txt````

## Use
````node parseSnb.js SNB_FILE```

The result will be an output file with the '.snb' extension replaced by '.txt'.


