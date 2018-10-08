# NodeJS-HAP-Server

A Node.js implementation of HomeKit Accessory Server. With this project, you
should be able to create your own HomeKit Accessory on a Raspberry Pi, Intel
Edison, or any other platform that can run Node.js.

This project is inspired by and based on the original [HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS) project by [KhaosT](https://github.com/KhaosT).

## Installation

Install this package using NPM.

```
npm install nodejs-hap-server
```

**Requirements**:
- Node.js version `8.12.0` and above.
- If you want to create IP Camera accessories install FFmpeg by following
instructions on their [website](https://www.ffmpeg.org/download.html).

## Examples

You can find predefined examples in the `/examples/accessories` folder in this
repository. Each file represents a single accessory and the default exported
value from the file should be an `Accessory` instance.

## Setup

Accessories can be published individually - each with its own server instance 
running on different port or under a bridge accessory that uses single server
instance. To checkout how it's done see `examples/Core.js` and
`examples/BridgedCore.js` respectively.

## Documentation

To fully understand how this library works and how to use it to its full
potential check out the [Wiki](https://github.com/VojtaSim/NodeJS-HAP-Server/wiki).
