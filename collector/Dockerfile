FROM docker.elastic.co/logstash/logstash:6.5.1
RUN rm -f /usr/share/logstash/pipeline/logstash.conf
ADD pipeline/ /usr/share/logstash/pipeline/
ADD config/ /usr/share/logstash/config/
ADD logstash-input-rss/ /usr/share/logstash/logstash-input-rss/

RUN echo 'gem "logstash-input-rss", :path => "/usr/share/logstash/logstash-input-rss"' >> /usr/share/logstash/Gemfile
RUN /usr/share/logstash/bin/logstash-plugin install --no-verify
