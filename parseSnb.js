#!/usr/bin/env node
/* $(NAME)
 * Author: jbroglio
 * Date: 10/14/14
 * Time: 7:23 PM
 */

var XmlStream = require('xml-stream'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib')
    ;

function unzip(stream, cb) {
    var unzip = require('unzip'),
        parser = unzip.Parse();


    stream.pipe(parser)
        .on('close', function () {
            // todo: what to do
            if (cb) cb("Entry not found.");
        })
        .on('error', function (err) {
            console.error("Error: " + err);
            cb(err);
            cb=null;
        })
        .on('entry', function (entry) {
            if (entry.type == 'File' && /.*snote.xml$/.test(entry.path)) {
                cb(null, entry);
                cb=null;
            } else {
                entry.autodrain();
            }
        });
}

function extract(fname, out) {
    var stream = fs.createReadStream(fname);
    if (/.*\.snb$/.test(fname)) {
        unzip(stream, function(err, s2){
            if (err) return;
            reallyExtract(s2);
        });
    } else reallyExtract(stream);

    function reallyExtract(s2) {
        var xml = new XmlStream(s2);
        //xml.collect('txext');
        //xml.on('endElement: sn:body > lxine', function(item){
        //    if (item.txext) console.log(item.txext);
        //    else console.log('empty');
        //    //stream.close();
        //})
        xml.on('text: sn:body > sn:l sn:t > ', function (txt) {
            out.write(txt['$text']+'\n');
        });
        xml.on('end', function () {
            stream.close();
        })
    }
}

if (require.main == module) {
    var outfile;
    if (process.argv.length>3) outfile= process.argv[3];
    else outfile=path.basename(process.argv[2], /snb$/.test(process.argv[2])?'.snb':'.xml')+'.txt';
    extract(process.argv[2], fs.createWriteStream(outfile, 'utf8'));
}