find ./ -name ".DS_Store" -depth -exec rm {} \;
python3 .prepare_diff_source.py remove_exclude;
python3 .prepare_diff_source.py commiting;

