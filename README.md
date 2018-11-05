# NodeJS-HAP-Server

A Node.js implementation of HomeKit Accessory Server. With this project, you
should be able to create your own HomeKit Accessory on a Raspberry Pi, Intel
Edison, or any other platform that can run Node.js.

This project is inspired by and based on the original [HAP-NodeJS](https://github.com/KhaosT/HAP-NodeJS) project by [KhaosT](https://github.com/KhaosT) but has been refactored from the ground-up.
- ES6, `async/await` and using native `Buffer`.
- Gone is getting characteristic value through `EventEmitter`.
- Camera accessory can be bridged (but still only one camera per bridge due to HAP limitations).
- Customizable cache implementations.

## Installation

Install this package using NPM.

```
npm install nodejs-hap-server
```

**Requirements**:
- Node.js version `8.12.0` and above.
- If you want to create IP Camera accessories install FFmpeg by following
instructions on their [website](https://www.ffmpeg.org/download.html).

## Documentation

To fully understand how this library works and how to use it to its full
potential check out the [Wiki](https://github.com/VojtaSim/NodeJS-HAP-Server/wiki).

## Examples

You can find predefined examples in the `/examples/accessories` folder in this
repository. Each file represents a single accessory and the default exported
value from the file should be an `Accessory` instance.
