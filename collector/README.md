# pipeline settings

to add/modify input sources, modify files in pipeline/

# How to run

```
git submodule update
docker build -t odaka-journal-collector:0.1 .
docker run -it odaka-journal-collector:0.1 /bin/bash
# in container
$ bin/logstash
```
