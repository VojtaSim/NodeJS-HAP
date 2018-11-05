declare namespace NodeJSHAPServer {

    // Service
    //
    type EventService = "characteristic-change" | "service-configurationChange";

    export interface IEventEmitterService {
        addListener(event: EventService, listener: Function): this;
        on(event: EventService, listener: Function): this;
        once(event: EventService, listener: Function): this;
        removeListener(event: EventService, listener: Function): this;
        removeAllListeners(event?: EventService): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: EventService): Function[];
        emit(event: EventService, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }

    export interface Service extends IEventEmitterService {
        new (displayName: string, UUID: string, subtype: string): Service;

        displayName: string;
        uuid: string;
        subtype: string;
        iid: string;
        characteristics: Characteristic[];
        optionalCharacteristics: Characteristic[];

        addCharacteristic(characteristic: Characteristic | Function): Characteristic;
        removeCharacteristic(characteristic: Characteristic): void;
        getCharacteristic(name: string | Function): Characteristic;
        hasCharacteristic(name: string | Function): boolean;
        getCharacteristicValue(name: string | Function): any;
        setCharacteristicValue(name: string | Function, value: any): Service;
        updateCharacteristicValue(name: string | Function, value: any): Service;
        addOptionalCharacteristic(characteristic: Characteristic | Function): void;
        getCharacteristicByIID(iid: string): Characteristic;
        setHiddenService(isHidden: boolean): void;
        addLinkedService(newLinkedService: Service): void;
        removeLinkedService(oldLinkedService: Service): void;
        toHAP(opt: any): JSON;

        AccessoryInformation: Service;
        AirPurifier: Service;
        AirQualitySensor: Service;
        BatteryService: Service;
        CameraControl: Service;
        CameraRTPStreamManagement: Service;
        CarbonDioxideSensor: Service;
        CarbonMonoxideSensor: Service;
        ContactSensor: Service;
        Door: Service;
        Doorbell: Service;
        Fan: Service;
        Fanv2: Service;
        FilterMaintenance: Service;
        GarageDoorOpener: Service;
        HeaterCooler: Service;
        HumidifierDehumidifier: Service;
        HumiditySensor: Service;
        LeakSensor: Service;
        LightSensor: Service;
        Lightbulb: Service;
        LockManagement: Service;
        LockMechanism: Service;
        Microphone: Service;
        MotionSensor: Service;
        OccupancySensor: Service;
        Outlet: Service;
        SecuritySystem: Service;
        Slat: Service;
        SmokeSensor: Service;
        Speaker: Service;
        StatefulProgrammableSwitch: Service;
        StatelessProgrammableSwitch: Service;
        Switch: Service;
        TemperatureSensor: Service;
        Thermostat: Service;
        Window: Service;
        WindowCovering: Service;
    }

    // Characteristic
    //
    type EventCharacteristic = "change";

    export interface IEventEmitterCharacteristic {
        addListener(event: EventCharacteristic, listener: Function): this;
        on(event: EventCharacteristic, listener: Function): this;
        once(event: EventCharacteristic, listener: Function): this;
        removeListener(event: EventCharacteristic, listener: Function): this;
        removeAllListeners(event?: EventCharacteristic): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: EventCharacteristic): Function[];
        emit(event: EventCharacteristic, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }

    export interface CharacteristicProps {
        format: Characteristic.Formats;
        unit: Characteristic.Units,
        minValue: number,
        maxValue: number,
        minStep: number,
        perms: Characteristic.Perms[]
    }

    export interface Characteristic extends IEventEmitterCharacteristic {
        new (displayName: string, characteristicUUID: string, props?: CharacteristicProps): Characteristic;

        Formats: typeof Characteristic.Formats;
        Units: typeof Characteristic.Units;
        Perms: typeof Characteristic.Perms;

        onGet(callback: (context?: any, connectionID?: string) => Promise<any>): Characteristic;
        onSet(callback: (value: any, context?: any, connectionID?: string) => Promise<any>): Characteristic;
        setProps(props: CharacteristicProps): Characteristic;
        async getValue(context?: any, connectionID?: string): void;
        async setValue(newValue: boolean | string | number, context?: any, connectionID?: string): Characteristic;
        async updateValue(newValue: boolean | string | number, context?: any): Characteristic;
        getDefaultValue(): boolean | string | number;
        toHAP(opt: any): JSON;

        AccessoryFlags: Characteristic;
        Active: Characteristic;
        AdministratorOnlyAccess: Characteristic;
        AirParticulateDensity: Characteristic;
        AirParticulateSize: Characteristic;
        AirQuality: Characteristic;
        AppMatchingIdentifier: Characteristic;
        AudioFeedback: Characteristic;
        BatteryLevel: Characteristic;
        Brightness: Characteristic;
        CarbonDioxideDetected: Characteristic;
        CarbonDioxideLevel: Characteristic;
        CarbonDioxidePeakLevel: Characteristic;
        CarbonMonoxideDetected: Characteristic;
        CarbonMonoxideLevel: Characteristic;
        CarbonMonoxidePeakLevel: Characteristic;
        ChargingState: Characteristic;
        ContactSensorState: Characteristic;
        CoolingThresholdTemperature: Characteristic;
        CurrentAirPurifierState: Characteristic;
        CurrentAmbientLightLevel: Characteristic;
        CurrentDoorState: Characteristic;
        CurrentFanState: Characteristic;
        CurrentHeaterCoolerState: Characteristic;
        CurrentHeatingCoolingState: Characteristic;
        CurrentHorizontalTiltAngle: Characteristic;
        CurrentHumidifierDehumidifierState: Characteristic;
        CurrentPosition: Characteristic;
        CurrentRelativeHumidity: Characteristic;
        CurrentSlatState: Characteristic;
        CurrentTemperature: Characteristic;
        CurrentTiltAngle: Characteristic;
        CurrentVerticalTiltAngle: Characteristic;
        DigitalZoom: Characteristic;
        FilterChangeIndication: Characteristic;
        FilterLifeLevel: Characteristic;
        FirmwareRevision: Characteristic;
        HardwareRevision: Characteristic;
        HeatingThresholdTemperature: Characteristic;
        HoldPosition: Characteristic;
        Hue: Characteristic;
        Identify: Characteristic;
        ImageMirroring: Characteristic;
        ImageRotation: Characteristic;
        LeakDetected: Characteristic;
        LockControlPoint: Characteristic;
        LockCurrentState: Characteristic;
        LockLastKnownAction: Characteristic;
        LockManagementAutoSecurityTimeout: Characteristic;
        LockPhysicalControls: Characteristic;
        LockTargetState: Characteristic;
        Logs: Characteristic;
        Manufacturer: Characteristic;
        Model: Characteristic;
        Mute: Characteristic;
        MotionDetected: Characteristic;
        Name: Characteristic;
        NightVision: Characteristic;
        NitrogenDioxideDensity: Characteristic;
        ObstructionDetected: Characteristic;
        OccupancyDetected: Characteristic;
        On: Characteristic;
        OpticalZoom: Characteristic;
        OutletInUse: Characteristic;
        OzoneDensity: Characteristic;
        PairSetup: Characteristic;
        PairVerify: Characteristic;
        PairingFeatures: Characteristic;
        PairingPairings: Characteristic;
        PM10Density: Characteristic;
        PM2_5Density: Characteristic;
        PositionState: Characteristic;
        ProgrammableSwitchEvent: Characteristic;
        ProgrammableSwitchOutputState: Characteristic;
        RelativeHumidityDehumidifierThreshold: Characteristic;
        RelativeHumidityHumidifierThreshold: Characteristic;
        ResetFilterIndication: Characteristic;
        RotationDirection: Characteristic;
        RotationSpeed: Characteristic;
        Saturation: Characteristic;
        SecuritySystemAlarmType: Characteristic;
        SecuritySystemCurrentState: Characteristic;
        SecuritySystemTargetState: Characteristic;
        SelectedStreamConfiguration: Characteristic;
        SerialNumber: Characteristic;
        SetupEndpoints: Characteristic;
        SlatType: Characteristic;
        SmokeDetected: Characteristic;
        SoftwareRevision: Characteristic;
        StatusActive: Characteristic;
        StatusFault: Characteristic;
        StatusJammed: Characteristic;
        StatusLowBattery: Characteristic;
        StatusTampered: Characteristic;
        StreamingStatus: Characteristic;
        SulphurDioxideDensity: Characteristic;
        SupportedAudioStreamConfiguration: Characteristic;
        SupportedRTPConfiguration: Characteristic;
        SupportedVideoStreamConfiguration: Characteristic;
        SwingMode: Characteristic;
        TargetAirPurifierState: Characteristic;
        TargetAirQuality: Characteristic;
        TargetDoorState: Characteristic;
        TargetFanState: Characteristic;
        TargetHeaterCoolerState: Characteristic;
        TargetHeatingCoolingState: Characteristic;
        TargetHorizontalTiltAngle: Characteristic;
        TargetHumidifierDehumidifierState: Characteristic;
        TargetPosition: Characteristic;
        TargetRelativeHumidity: Characteristic;
        TargetSlatState: Characteristic;
        TargetTemperature: Characteristic;
        TargetTiltAngle: Characteristic;
        TargetVerticalTiltAngle: Characteristic;
        TemperatureDisplayUnits: Characteristic;
        Version: Characteristic;
        VOCDensity: Characteristic;
        Volume: Characteristic;
        WaterLevel: Characteristic;
    }

    module Characteristic {
        export enum Formats {
            BOOL,
            INT,
            FLOAT,
            STRING,
            ARRAY, // unconfirmed
            DICTIONARY, // unconfirmed
            UINT8,
            UINT16,
            UINT32,
            UINT64,
            DATA, // unconfirmed
            TLV8
        }

        export enum Units {
            // HomeKit only defines Celsius, for Fahrenheit, it requires iOS app to do the conversion.
            CELSIUS,
            PERCENTAGE,
            ARC_DEGREE,
            LUX,
            SECONDS
        }

        export enum Perms {
            READ,
            WRITE,
            NOTIFY,
            HIDDEN
        }
    }

    // Accessory
    //
    type EventAccessory = "service-configurationChange" | "service-characteristic-change" | "identify"

    export interface IEventEmitterAccessory {
        addListener(event: EventAccessory, listener: Function): this;
        on(event: EventAccessory, listener: Function): this;
        once(event: EventAccessory, listener: Function): this;
        removeListener(event: EventAccessory, listener: Function): this;
        removeAllListeners(event?: EventAccessory): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: EventAccessory): Function[];
        emit(event: EventAccessory, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }

    export interface AccessoryInfo {
        displayName: string,
        port: number;
        username: string;
        pincode: string;
        category: Accessory.Categories;
    }

    export interface PublishInfo {
        port: number;
        username: string;
        pincode: string;
    }

    export interface Accessory extends IEventEmitterAccessory {
        new (accessoryUUID: string, accessoryInfo: AccessoryInfo): Accessory;

        uuid: string;
        aid: string;
        info: AccessoryInfo;
        setupURL: string;
        bridged: boolean;
        services: Service[];
        Categories: typeof Accessory.Categories;

        static load(searchPattern: string): Accessory[];

        addService(service: Service | Function, ...args: any[]): Service;
        setPrimaryService(service: Service): void;
        removeService(service: Service): void;
        getService(name: string | Function): Service;
        
        getCharacteristicByIID(iid: string): Characteristic;
        findCharacteristic(aid: string, iid: string): Accessory;
        toHAP(options: any): JSON;
        publish(info: PublishInfo, allowInsecureRequest: boolean): void;
        destroy(): void;
        unpublish(): void;
        purgeUnusedIDs(): void;
        disableUnusedIDPurge(): void;
        enableUnusedIDPurge(): void;
    }

    module Accessory {
        export enum Categories {
            OTHER = 1,
            BRIDGE = 2,
            FAN = 3,
            GARAGE_DOOR_OPENER = 4,
            LIGHTBULB = 5,
            DOOR_LOCK = 6,
            OUTLET = 7,
            SWITCH = 8,
            THERMOSTAT = 9,
            SENSOR = 10,
            ALARM_SYSTEM = 11,
            DOOR = 12,
            WINDOW = 13,
            WINDOW_COVERING = 14,
            PROGRAMMABLE_SWITCH = 15,
            RANGE_EXTENDER = 16,
            CAMERA = 17
        }
    }

    // Bridge
    //
    export interface Bridge extends Accessory {
        bridgedAccessories: Accessory[];

        addBridgedAccessory(accessory: Accessory | Accessory[], deferUpdate: boolean): Accessory | Accessory[];
        getBridgedAccessoryByAID(aid: string): Accessory;
        removeBridgedAccessory(accessory: Accessory | Accessory[], deferUpdate: boolean): void;
    }

    // Camera Accessory
    //
    export interface CameraConfig {
        source: String;
        stillImageSource: String;
        vCodec: String = 'libx264';
        aCodec: String = 'libfdk_aac';
        audioEnabled: Boolean;
        packetSize: Number = 1316;
        maxFps: Number = 10,
        maxBitrate: Number = 300,
        streams: Number = 2;
        maxWidth: Number = 1280;
        maxHeight: Number = 720;
    }

    export interface StreamOptions {
        proxy: Boolean,
        strp: Boolean,
        video: {
            resolutions: [[Number, Number, Number]],
            codec: {
                profiles: Number[],
                levels: Number[]
            }
        },
        audio: {
            codecs: [
                {
                    type: String,
                    sampleRate: Number
                }
            ]
        }
    }

    export interface CameraAccessory extends Accessory {
        static ffmpegBinary: String;

        new (cameraUUID: string, cameraInfo: AccessoryInfo, cameraConfig: CameraConfig): CameraAccessory;

        createCameraControlServices(numberOfStreams: Number, streamOptions: StreamOptions): void;
    }

    export interface StreamController {
        new (identifier: Number, options: StreamOptions, cameraAccessory: CameraAccessory): StreamController;
    }

    module StreamController {
        export enum SetupTypes {
            SESSION_ID = 0x01,
            STATUS = 0x02,
            ADDRESS = 0x03,
            VIDEO_SRTP_PARAM = 0x04,
            AUDIO_SRTP_PARAM = 0x05,
            VIDEO_SSRC = 0x06,
            AUDIO_SSRC = 0x07
        }
        
        export enum SetupStatus {
            SUCCESS = 0x00,
            BUSY = 0x01,
            ERROR = 0x02
        }
        
        export enum SetupAddressVer {
            IPV4 = 0x00,
            IPV6 = 0x01
        }
        
        export enum SetupAddressInfo {
            ADDRESS_VER = 0x01,
            ADDRESS = 0x02,
            VIDEO_RTP_PORT = 0x03,
            AUDIO_RTP_PORT = 0x04
        }
        
        export enum SetupSRTP_PARAM {
            CRYPTO = 0x01,
            MASTER_KEY = 0x02,
            MASTER_SALT = 0x03
        }
        
        export enum StreamingStatus {
            AVAILABLE = 0x00,
            STREAMING = 0x01,
            BUSY = 0x02
        }
        
        export enum RTPConfigTypes {
            CRYPTO = 0x02
        }
        
        export enum SRTPCryptoSuites {
            AES_CM_128_HMAC_SHA1_80 = 0x00,
            AES_CM_256_HMAC_SHA1_80 = 0x01,
            NONE = 0x02
        }
        
        export enum VideoTypes {
            CODEC = 0x01,
            CODEC_PARAM = 0x02,
            ATTRIBUTES = 0x03,
            RTP_PARAM = 0x04
        }
        
        export enum VideoCodecTypes {
            H264 = 0x00
        }
        
        export enum VideoCodecParamTypes {
            PROFILE_ID = 0x01,
            LEVEL = 0x02,
            PACKETIZATION_MODE = 0x03,
            CVO_ENABLED = 0x04,
            CVO_ID = 0x05
        }
        
        export enum VideoCodecParamCVOTypes {
            UNSUPPORTED = 0x01,
            SUPPORTED = 0x02
        }
        
        export enum VideoCodecParamProfileIDTypes {
            BASELINE = 0x00,
            MAIN = 0x01,
            HIGH = 0x02
        }
        
        export enum VideoCodecParamLevelTypes {
            TYPE3_1 = 0x00,
            TYPE3_2 = 0x01,
            TYPE4_0 = 0x02
        }
        
        export enum VideoCodecParamPacketizationModeTypes {
            NON_INTERLEAVED = 0x00
        }
        
        export enum VideoAttributesTypes {
            IMAGE_WIDTH = 0x01,
            IMAGE_HEIGHT = 0x02,
            FRAME_RATE = 0x03
        }
        
        export enum SelectedStreamConfigurationTypes {
            SESSION = 0x01,
            VIDEO = 0x02,
            AUDIO = 0x03
        }
        
        export enum RTPParamTypes {
            PAYLOAD_TYPE = 0x01,
            SYNCHRONIZATION_SOURCE = 0x02,
            MAX_BIT_RATE = 0x03,
            RTCP_SEND_INTERVAL = 0x04,
            MAX_MTU = 0x05,
            COMFORT_NOISE_PAYLOAD_TYPE = 0x06
        }
        
        export enum AudioTypes {
            CODEC = 0x01,
            CODEC_PARAM = 0x02,
            RTP_PARAM = 0x03,
            COMFORT_NOISE = 0x04
        }
        
        export enum AudioCodecTypes {
            PCMU = 0x00,
            PCMA = 0x01,
            AACELD = 0x02,
            OPUS = 0x03
        }
        
        export enum AudioCodecParamTypes {
            CHANNEL = 0x01,
            BIT_RATE = 0x02,
            SAMPLE_RATE = 0x03,
            PACKET_TIME = 0x04
        }
        
        export enum AudioCodecParamBitRateTypes {
            VARIABLE = 0x00,
            CONSTANT = 0x01
        }
        
        export enum AudioCodecParamSampleRateTypes {
            KHZ_8 = 0x00,
            KHZ_16 = 0x01,
            KHZ_24 = 0x02
        }
    }

    // Abstract Cache
    //
    export interface AbstractCache {
        static storagePath: String;
    
        static readCacheFile(fileName: String): JSON;
        static writeCacheFile(fileName: String, data: Object): void;
        static deleteCacheFile(fileName: String): void;
    }

    // Accessory Cache
    //
    export interface AccessoryCache extends AbstractCache {
        static create(uuid: String): AccessoryCache;
        static load(uuid: String): AccessoryCache | null;

        new (uuid: String): AccessoryCache;
    
        addPairedClient(username: String, publicKey: Buffer): void;
        removePairedClient(username: String): void;
        getClientPublicKey(username: String): Buffer | undefined;
        isPaired(): Boolean;
        save(): void;
        remove(): void;
    }

    export interface IdentifierCache extends AbstractCache {
        static load(uuid: String): IdentifierCache;
    
        new (uuid: String): IdentifierCache;
    
        startTrackingUsage(): void;
        stopTrackingUsageAndExpireUnused(): void;
    
        getCache(key: String): Number;
        setCache(key: String, value: Number): Number;
        getAID(accessoryUUID: String): Number;
        getIID(accessoryUUID: String, serviceUUID: String, serviceSubtype?: String, characteristicUUID?: String): Number;
        getNextAID(): Number;
        getNextIID(accessoryUUID: String): Number;
        save(): void;
        remove(): void;
    }

    export interface NodeJSHAPServer {
        Accessory: Accessory,
        Bridge: Bridge,
        CameraAccessory: CameraAccessory,
        StreamController: StreamController,
        Service: Service,
        Characteristic: Characteristic,
        AbstractCache: AbstractCache,
        AccessoryCache: AccessoryCache,
        IdentifierCache: IdentifierCache
    }
}

declare var nodeJsHAPServer: NodeJSHAPServer.NodeJSHAPServer;

declare module "nodejs-hap-server" {
    export = nodeJsHAPServer;
}
