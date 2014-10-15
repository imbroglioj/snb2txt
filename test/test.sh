#!/bin/bash
dir=`dirname $0`
pushd $dir >/dev/null
dir=`pwd`
popd >/dev/null
$dir/../parseSnb.js $dir/data/NY-sights.snb
x=`diff $dir/../NY-sights.txt $dir/data/test-out.txt`
if [ "$x" != "" ] ; then echo FAILED ; else echo PASSED ; fi

