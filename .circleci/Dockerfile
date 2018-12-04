FROM circleci/node:11-browsers
LABEL maintainer="TSUYUSATO Kitsune <make.just.on@gmail.com>"

# Add Japanese font.
RUN sudo apt-get update \
 && sudo apt-get install -y fonts-noto-cjk \
 && sudo apt-get clean \
 && sudo rm -rf /var/lib/apt/lists/*
