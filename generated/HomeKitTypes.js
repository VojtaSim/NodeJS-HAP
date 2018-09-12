// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY

const Characteristic = require('../Characteristic');
const Service = require('../Service');

/**
 * Characteristic "Accessory Identifier"
 */

class AccessoryIdentifier extends Characteristic {
	constructor() {
		super('Accessory Identifier', '00000057-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.AccessoryIdentifier = AccessoryIdentifier;
Characteristic.AccessoryIdentifier.UUID = '00000057-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Administrator Only Access"
 */

class AdministratorOnlyAccess extends Characteristic {
	constructor() {
		super('Administrator Only Access', '00000001-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.AdministratorOnlyAccess = AdministratorOnlyAccess;
Characteristic.AdministratorOnlyAccess.UUID = '00000001-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Air Particulate Density"
 */

class AirParticulateDensity extends Characteristic {
	constructor() {
		super('Air Particulate Density', '00000064-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			maxValue: 1000,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.AirParticulateDensity = AirParticulateDensity;
Characteristic.AirParticulateDensity.UUID = '00000064-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Air Particulate Size"
 */

class AirParticulateSize extends Characteristic {
	constructor() {
		super('Air Particulate Size', '00000065-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.AirParticulateSize = AirParticulateSize;
Characteristic.AirParticulateSize.UUID = '00000065-0000-1000-8000-0026BB765291';

// The value property of AirParticulateSize must be one of the following:
Characteristic.AirParticulateSize._2_5_M = 0;
Characteristic.AirParticulateSize._10_M = 1;

/**
 * Characteristic "Air Quality"
 */

class AirQuality extends Characteristic {
	constructor() {
		super('Air Quality', '00000095-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.AirQuality = AirQuality;
Characteristic.AirQuality.UUID = '00000095-0000-1000-8000-0026BB765291';

// The value property of AirQuality must be one of the following:
Characteristic.AirQuality.UNKNOWN = 0;
Characteristic.AirQuality.EXCELLENT = 1;
Characteristic.AirQuality.GOOD = 2;
Characteristic.AirQuality.FAIR = 3;
Characteristic.AirQuality.INFERIOR = 4;
Characteristic.AirQuality.POOR = 5;

/**
 * Characteristic "Audio Feedback"
 */

class AudioFeedback extends Characteristic {
	constructor() {
		super('Audio Feedback', '00000005-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.AudioFeedback = AudioFeedback;
Characteristic.AudioFeedback.UUID = '00000005-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Battery Level"
 */

class BatteryLevel extends Characteristic {
	constructor() {
		super('Battery Level', '00000068-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.BatteryLevel = BatteryLevel;
Characteristic.BatteryLevel.UUID = '00000068-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Brightness"
 */

class Brightness extends Characteristic {
	constructor() {
		super('Brightness', '00000008-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Brightness = Brightness;
Characteristic.Brightness.UUID = '00000008-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Dioxide Detected"
 */

class CarbonDioxideDetected extends Characteristic {
	constructor() {
		super('Carbon Dioxide Detected', '00000092-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CarbonDioxideDetected = CarbonDioxideDetected;
Characteristic.CarbonDioxideDetected.UUID = '00000092-0000-1000-8000-0026BB765291';

// The value property of CarbonDioxideDetected must be one of the following:
Characteristic.CarbonDioxideDetected.CO2_LEVELS_NORMAL = 0;
Characteristic.CarbonDioxideDetected.CO2_LEVELS_ABNORMAL = 1;

/**
 * Characteristic "Carbon Dioxide Level"
 */

class CarbonDioxideLevel extends Characteristic {
	constructor() {
		super('Carbon Dioxide Level', '00000093-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			maxValue: 100000,
			minValue: 0,
			minStep: 100,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CarbonDioxideLevel = CarbonDioxideLevel;
Characteristic.CarbonDioxideLevel.UUID = '00000093-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Dioxide Peak Level"
 */

class CarbonDioxidePeakLevel extends Characteristic {
	constructor() {
		super('Carbon Dioxide Peak Level', '00000094-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			maxValue: 100000,
			minValue: 0,
			minStep: 100,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
Characteristic.CarbonDioxidePeakLevel.UUID = '00000094-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Monoxide Detected"
 */

class CarbonMonoxideDetected extends Characteristic {
	constructor() {
		super('Carbon Monoxide Detected', '00000069-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CarbonMonoxideDetected = CarbonMonoxideDetected;
Characteristic.CarbonMonoxideDetected.UUID = '00000069-0000-1000-8000-0026BB765291';

// The value property of CarbonMonoxideDetected must be one of the following:
Characteristic.CarbonMonoxideDetected.CO_LEVELS_NORMAL = 0;
Characteristic.CarbonMonoxideDetected.CO_LEVELS_ABNORMAL = 1;

/**
 * Characteristic "Carbon Monoxide Level"
 */

class CarbonMonoxideLevel extends Characteristic {
	constructor() {
		super('Carbon Monoxide Level', '00000090-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			maxValue: 100,
			minValue: 0,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CarbonMonoxideLevel = CarbonMonoxideLevel;
Characteristic.CarbonMonoxideLevel.UUID = '00000090-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Carbon Monoxide Peak Level"
 */

class CarbonMonoxidePeakLevel extends Characteristic {
	constructor() {
		super('Carbon Monoxide Peak Level', '00000091-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			maxValue: 100,
			minValue: 0,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
Characteristic.CarbonMonoxidePeakLevel.UUID = '00000091-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Category"
 */

class Category extends Characteristic {
	constructor() {
		super('Category', '000000A3-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT16,
			maxValue: 16,
			minValue: 1,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Category = Category;
Characteristic.Category.UUID = '000000A3-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Charging State"
 */

class ChargingState extends Characteristic {
	constructor() {
		super('Charging State', '0000008F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.ChargingState = ChargingState;
Characteristic.ChargingState.UUID = '0000008F-0000-1000-8000-0026BB765291';

// The value property of ChargingState must be one of the following:
Characteristic.ChargingState.NOT_CHARGING = 0;
Characteristic.ChargingState.CHARGING = 1;

/**
 * Characteristic "Configure Bridged Accessory"
 */

class ConfigureBridgedAccessory extends Characteristic {
	constructor() {
		super('Configure Bridged Accessory', '000000A0-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.ConfigureBridgedAccessory = ConfigureBridgedAccessory;
Characteristic.ConfigureBridgedAccessory.UUID = '000000A0-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Configure Bridged Accessory Status"
 */

class ConfigureBridgedAccessoryStatus extends Characteristic {
	constructor() {
		super('Configure Bridged Accessory Status', '0000009D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.ConfigureBridgedAccessoryStatus = ConfigureBridgedAccessoryStatus;
Characteristic.ConfigureBridgedAccessoryStatus.UUID = '0000009D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Contact Sensor State"
 */

class ContactSensorState extends Characteristic {
	constructor() {
		super('Contact Sensor State', '0000006A-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.ContactSensorState = ContactSensorState;
Characteristic.ContactSensorState.UUID = '0000006A-0000-1000-8000-0026BB765291';

// The value property of ContactSensorState must be one of the following:
Characteristic.ContactSensorState.CONTACT_DETECTED = 0;
Characteristic.ContactSensorState.CONTACT_NOT_DETECTED = 1;

/**
 * Characteristic "Cooling Threshold Temperature"
 */

class CoolingThresholdTemperature extends Characteristic {
	constructor() {
		super('Cooling Threshold Temperature', '0000000D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.CELSIUS,
			maxValue: 35,
			minValue: 10,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CoolingThresholdTemperature = CoolingThresholdTemperature;
Characteristic.CoolingThresholdTemperature.UUID = '0000000D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Ambient Light Level"
 */

class CurrentAmbientLightLevel extends Characteristic {
	constructor() {
		super('Current Ambient Light Level', '0000006B-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.LUX,
			maxValue: 100000,
			minValue: 0.0001,
			minStep: 0.0001,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
Characteristic.CurrentAmbientLightLevel.UUID = '0000006B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Door State"
 */

class CurrentDoorState extends Characteristic {
	constructor() {
		super('Current Door State', '0000000E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentDoorState = CurrentDoorState;
Characteristic.CurrentDoorState.UUID = '0000000E-0000-1000-8000-0026BB765291';

// The value property of CurrentDoorState must be one of the following:
Characteristic.CurrentDoorState.OPEN = 0;
Characteristic.CurrentDoorState.CLOSED = 1;
Characteristic.CurrentDoorState.OPENING = 2;
Characteristic.CurrentDoorState.CLOSING = 3;
Characteristic.CurrentDoorState.STOPPED = 4;

/**
 * Characteristic "Current Heating Cooling State"
 */

class CurrentHeatingCoolingState extends Characteristic {
	constructor() {
		super('Current Heating Cooling State', '0000000F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentHeatingCoolingState = CurrentHeatingCoolingState;
Characteristic.CurrentHeatingCoolingState.UUID = '0000000F-0000-1000-8000-0026BB765291';

// The value property of CurrentHeatingCoolingState must be one of the following:
Characteristic.CurrentHeatingCoolingState.OFF = 0;
Characteristic.CurrentHeatingCoolingState.HEAT = 1;
Characteristic.CurrentHeatingCoolingState.COOL = 2;

/**
 * Characteristic "Current Horizontal Tilt Angle"
 */

class CurrentHorizontalTiltAngle extends Characteristic {
	constructor() {
		super('Current Horizontal Tilt Angle', '0000006C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
Characteristic.CurrentHorizontalTiltAngle.UUID = '0000006C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Position"
 */

class CurrentPosition extends Characteristic {
	constructor() {
		super('Current Position', '0000006D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentPosition = CurrentPosition;
Characteristic.CurrentPosition.UUID = '0000006D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Relative Humidity"
 */

class CurrentRelativeHumidity extends Characteristic {
	constructor() {
		super('Current Relative Humidity', '00000010-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentRelativeHumidity = CurrentRelativeHumidity;
Characteristic.CurrentRelativeHumidity.UUID = '00000010-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Temperature"
 */

class CurrentTemperature extends Characteristic {
	constructor() {
		super('Current Temperature', '00000011-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.CELSIUS,
			maxValue: 100,
			minValue: 0,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentTemperature = CurrentTemperature;
Characteristic.CurrentTemperature.UUID = '00000011-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Time"
 */

class CurrentTime extends Characteristic {
	constructor() {
		super('Current Time', '0000009B-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.CurrentTime = CurrentTime;
Characteristic.CurrentTime.UUID = '0000009B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Current Vertical Tilt Angle"
 */

class CurrentVerticalTiltAngle extends Characteristic {
	constructor() {
		super('Current Vertical Tilt Angle', '0000006E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
Characteristic.CurrentVerticalTiltAngle.UUID = '0000006E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Day of the Week"
 */

class DayoftheWeek extends Characteristic {
	constructor() {
		super('Day of the Week', '00000098-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			maxValue: 7,
			minValue: 1,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.DayoftheWeek = DayoftheWeek;
Characteristic.DayoftheWeek.UUID = '00000098-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Discover Bridged Accessories"
 */

class DiscoverBridgedAccessories extends Characteristic {
	constructor() {
		super('Discover Bridged Accessories', '0000009E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.DiscoverBridgedAccessories = DiscoverBridgedAccessories;
Characteristic.DiscoverBridgedAccessories.UUID = '0000009E-0000-1000-8000-0026BB765291';

// The value property of DiscoverBridgedAccessories must be one of the following:
Characteristic.DiscoverBridgedAccessories.START_DISCOVERY = 0;
Characteristic.DiscoverBridgedAccessories.STOP_DISCOVERY = 1;

/**
 * Characteristic "Discovered Bridged Accessories"
 */

class DiscoveredBridgedAccessories extends Characteristic {
	constructor() {
		super('Discovered Bridged Accessories', '0000009F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT16,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.DiscoveredBridgedAccessories = DiscoveredBridgedAccessories;
Characteristic.DiscoveredBridgedAccessories.UUID = '0000009F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Firmware Revision"
 */

class FirmwareRevision extends Characteristic {
	constructor() {
		super('Firmware Revision', '00000052-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.FirmwareRevision = FirmwareRevision;
Characteristic.FirmwareRevision.UUID = '00000052-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Hardware Revision"
 */

class HardwareRevision extends Characteristic {
	constructor() {
		super('Hardware Revision', '00000053-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.HardwareRevision = HardwareRevision;
Characteristic.HardwareRevision.UUID = '00000053-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Heating Threshold Temperature"
 */

class HeatingThresholdTemperature extends Characteristic {
	constructor() {
		super('Heating Threshold Temperature', '00000012-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.CELSIUS,
			maxValue: 25,
			minValue: 0,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.HeatingThresholdTemperature = HeatingThresholdTemperature;
Characteristic.HeatingThresholdTemperature.UUID = '00000012-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Hold Position"
 */

class HoldPosition extends Characteristic {
	constructor() {
		super('Hold Position', '0000006F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.HoldPosition = HoldPosition;
Characteristic.HoldPosition.UUID = '0000006F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Hue"
 */

class Hue extends Characteristic {
	constructor() {
		super('Hue', '00000013-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 360,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Hue = Hue;
Characteristic.Hue.UUID = '00000013-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Identify"
 */

class Identify extends Characteristic {
	constructor() {
		super('Identify', '00000014-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.Identify = Identify;
Characteristic.Identify.UUID = '00000014-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Leak Detected"
 */

class LeakDetected extends Characteristic {
	constructor() {
		super('Leak Detected', '00000070-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.LeakDetected = LeakDetected;
Characteristic.LeakDetected.UUID = '00000070-0000-1000-8000-0026BB765291';

// The value property of LeakDetected must be one of the following:
Characteristic.LeakDetected.LEAK_NOT_DETECTED = 0;
Characteristic.LeakDetected.LEAK_DETECTED = 1;

/**
 * Characteristic "Link Quality"
 */

class LinkQuality extends Characteristic {
	constructor() {
		super('Link Quality', '0000009C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			maxValue: 4,
			minValue: 1,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.LinkQuality = LinkQuality;
Characteristic.LinkQuality.UUID = '0000009C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Lock Control Point"
 */

class LockControlPoint extends Characteristic {
	constructor() {
		super('Lock Control Point', '00000019-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.LockControlPoint = LockControlPoint;
Characteristic.LockControlPoint.UUID = '00000019-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Lock Current State"
 */

class LockCurrentState extends Characteristic {
	constructor() {
		super('Lock Current State', '0000001D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.LockCurrentState = LockCurrentState;
Characteristic.LockCurrentState.UUID = '0000001D-0000-1000-8000-0026BB765291';

// The value property of LockCurrentState must be one of the following:
Characteristic.LockCurrentState.UNSECURED = 0;
Characteristic.LockCurrentState.SECURED = 1;
Characteristic.LockCurrentState.JAMMED = 2;
Characteristic.LockCurrentState.UNKNOWN = 3;

/**
 * Characteristic "Lock Last Known Action"
 */

class LockLastKnownAction extends Characteristic {
	constructor() {
		super('Lock Last Known Action', '0000001C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.LockLastKnownAction = LockLastKnownAction;
Characteristic.LockLastKnownAction.UUID = '0000001C-0000-1000-8000-0026BB765291';

// The value property of LockLastKnownAction must be one of the following:
Characteristic.LockLastKnownAction.SECURED_PHYSICALLY_INTERIOR = 0;
Characteristic.LockLastKnownAction.UNSECURED_PHYSICALLY_INTERIOR = 1;
Characteristic.LockLastKnownAction.SECURED_PHYSICALLY_EXTERIOR = 2;
Characteristic.LockLastKnownAction.UNSECURED_PHYSICALLY_EXTERIOR = 3;
Characteristic.LockLastKnownAction.SECURED_BY_KEYPAD = 4;
Characteristic.LockLastKnownAction.UNSECURED_BY_KEYPAD = 5;
Characteristic.LockLastKnownAction.SECURED_REMOTELY = 6;
Characteristic.LockLastKnownAction.UNSECURED_REMOTELY = 7;
Characteristic.LockLastKnownAction.SECURED_BY_AUTO_SECURE_TIMEOUT = 8;

/**
 * Characteristic "Lock Management Auto Security Timeout"
 */

class LockManagementAutoSecurityTimeout extends Characteristic {
	constructor() {
		super('Lock Management Auto Security Timeout', '0000001A-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT32,
			unit: Characteristic.Units.SECONDS,
			maxValue: 86400,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
Characteristic.LockManagementAutoSecurityTimeout.UUID = '0000001A-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Lock Target State"
 */

class LockTargetState extends Characteristic {
	constructor() {
		super('Lock Target State', '0000001E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.LockTargetState = LockTargetState;
Characteristic.LockTargetState.UUID = '0000001E-0000-1000-8000-0026BB765291';

// The value property of LockTargetState must be one of the following:
Characteristic.LockTargetState.UNSECURED = 0;
Characteristic.LockTargetState.SECURED = 1;

/**
 * Characteristic "Logs"
 */

class Logs extends Characteristic {
	constructor() {
		super('Logs', '0000001F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Logs = Logs;
Characteristic.Logs.UUID = '0000001F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Manufacturer"
 */

class Manufacturer extends Characteristic {
	constructor() {
		super('Manufacturer', '00000020-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.Manufacturer = Manufacturer;
Characteristic.Manufacturer.UUID = '00000020-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Model"
 */

class Model extends Characteristic {
	constructor() {
		super('Model', '00000021-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.Model = Model;
Characteristic.Model.UUID = '00000021-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Motion Detected"
 */

class MotionDetected extends Characteristic {
	constructor() {
		super('Motion Detected', '00000022-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.MotionDetected = MotionDetected;
Characteristic.MotionDetected.UUID = '00000022-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Name"
 */

class Name extends Characteristic {
	constructor() {
		super('Name', '00000023-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.Name = Name;
Characteristic.Name.UUID = '00000023-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Obstruction Detected"
 */

class ObstructionDetected extends Characteristic {
	constructor() {
		super('Obstruction Detected', '00000024-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.ObstructionDetected = ObstructionDetected;
Characteristic.ObstructionDetected.UUID = '00000024-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Occupancy Detected"
 */

class OccupancyDetected extends Characteristic {
	constructor() {
		super('Occupancy Detected', '00000071-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.OccupancyDetected = OccupancyDetected;
Characteristic.OccupancyDetected.UUID = '00000071-0000-1000-8000-0026BB765291';

// The value property of OccupancyDetected must be one of the following:
Characteristic.OccupancyDetected.OCCUPANCY_NOT_DETECTED = 0;
Characteristic.OccupancyDetected.OCCUPANCY_DETECTED = 1;

/**
 * Characteristic "On"
 */

class On extends Characteristic {
	constructor() {
		super('On', '00000025-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.On = On;
Characteristic.On.UUID = '00000025-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Outlet In Use"
 */

class OutletInUse extends Characteristic {
	constructor() {
		super('Outlet In Use', '00000026-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.OutletInUse = OutletInUse;
Characteristic.OutletInUse.UUID = '00000026-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pair Setup"
 */

class PairSetup extends Characteristic {
	constructor() {
		super('Pair Setup', '0000004C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.PairSetup = PairSetup;
Characteristic.PairSetup.UUID = '0000004C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pair Verify"
 */

class PairVerify extends Characteristic {
	constructor() {
		super('Pair Verify', '0000004E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.PairVerify = PairVerify;
Characteristic.PairVerify.UUID = '0000004E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pairing Features"
 */

class PairingFeatures extends Characteristic {
	constructor() {
		super('Pairing Features', '0000004F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.PairingFeatures = PairingFeatures;
Characteristic.PairingFeatures.UUID = '0000004F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Pairing Pairings"
 */

class PairingPairings extends Characteristic {
	constructor() {
		super('Pairing Pairings', '00000050-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE]
		});
	}
}

Characteristic.PairingPairings = PairingPairings;
Characteristic.PairingPairings.UUID = '00000050-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Position State"
 */

class PositionState extends Characteristic {
	constructor() {
		super('Position State', '00000072-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.PositionState = PositionState;
Characteristic.PositionState.UUID = '00000072-0000-1000-8000-0026BB765291';

// The value property of PositionState must be one of the following:
Characteristic.PositionState.DECREASING = 0;
Characteristic.PositionState.INCREASING = 1;
Characteristic.PositionState.STOPPED = 2;

/**
 * Characteristic "Programmable Switch Event"
 */

class ProgrammableSwitchEvent extends Characteristic {
	constructor() {
		super('Programmable Switch Event', '00000073-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			maxValue: 1,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
Characteristic.ProgrammableSwitchEvent.UUID = '00000073-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Programmable Switch Output State"
 */

class ProgrammableSwitchOutputState extends Characteristic {
	constructor() {
		super('Programmable Switch Output State', '00000074-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			maxValue: 1,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.ProgrammableSwitchOutputState = ProgrammableSwitchOutputState;
Characteristic.ProgrammableSwitchOutputState.UUID = '00000074-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Reachable"
 */

class Reachable extends Characteristic {
	constructor() {
		super('Reachable', '00000063-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Reachable = Reachable;
Characteristic.Reachable.UUID = '00000063-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Rotation Direction"
 */

class RotationDirection extends Characteristic {
	constructor() {
		super('Rotation Direction', '00000028-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.RotationDirection = RotationDirection;
Characteristic.RotationDirection.UUID = '00000028-0000-1000-8000-0026BB765291';

// The value property of RotationDirection must be one of the following:
Characteristic.RotationDirection.CLOCKWISE = 0;
Characteristic.RotationDirection.COUNTER_CLOCKWISE = 1;

/**
 * Characteristic "Rotation Speed"
 */

class RotationSpeed extends Characteristic {
	constructor() {
		super('Rotation Speed', '00000029-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.RotationSpeed = RotationSpeed;
Characteristic.RotationSpeed.UUID = '00000029-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Saturation"
 */

class Saturation extends Characteristic {
	constructor() {
		super('Saturation', '0000002F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Saturation = Saturation;
Characteristic.Saturation.UUID = '0000002F-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Security System Alarm Type"
 */

class SecuritySystemAlarmType extends Characteristic {
	constructor() {
		super('Security System Alarm Type', '0000008E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			maxValue: 1,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.SecuritySystemAlarmType = SecuritySystemAlarmType;
Characteristic.SecuritySystemAlarmType.UUID = '0000008E-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Security System Current State"
 */

class SecuritySystemCurrentState extends Characteristic {
	constructor() {
		super('Security System Current State', '00000066-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.SecuritySystemCurrentState = SecuritySystemCurrentState;
Characteristic.SecuritySystemCurrentState.UUID = '00000066-0000-1000-8000-0026BB765291';

// The value property of SecuritySystemCurrentState must be one of the following:
Characteristic.SecuritySystemCurrentState.STAY_ARM = 0;
Characteristic.SecuritySystemCurrentState.AWAY_ARM = 1;
Characteristic.SecuritySystemCurrentState.NIGHT_ARM = 2;
Characteristic.SecuritySystemCurrentState.DISARMED = 3;
Characteristic.SecuritySystemCurrentState.ALARM_TRIGGERED = 4;

/**
 * Characteristic "Security System Target State"
 */

class SecuritySystemTargetState extends Characteristic {
	constructor() {
		super('Security System Target State', '00000067-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.SecuritySystemTargetState = SecuritySystemTargetState;
Characteristic.SecuritySystemTargetState.UUID = '00000067-0000-1000-8000-0026BB765291';

// The value property of SecuritySystemTargetState must be one of the following:
Characteristic.SecuritySystemTargetState.STAY_ARM = 0;
Characteristic.SecuritySystemTargetState.AWAY_ARM = 1;
Characteristic.SecuritySystemTargetState.NIGHT_ARM = 2;
Characteristic.SecuritySystemTargetState.DISARM = 3;

/**
 * Characteristic "Serial Number"
 */

class SerialNumber extends Characteristic {
	constructor() {
		super('Serial Number', '00000030-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.SerialNumber = SerialNumber;
Characteristic.SerialNumber.UUID = '00000030-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Smoke Detected"
 */

class SmokeDetected extends Characteristic {
	constructor() {
		super('Smoke Detected', '00000076-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.SmokeDetected = SmokeDetected;
Characteristic.SmokeDetected.UUID = '00000076-0000-1000-8000-0026BB765291';

// The value property of SmokeDetected must be one of the following:
Characteristic.SmokeDetected.SMOKE_NOT_DETECTED = 0;
Characteristic.SmokeDetected.SMOKE_DETECTED = 1;

/**
 * Characteristic "Software Revision"
 */

class SoftwareRevision extends Characteristic {
	constructor() {
		super('Software Revision', '00000054-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ]
		});
	}
}

Characteristic.SoftwareRevision = SoftwareRevision;
Characteristic.SoftwareRevision.UUID = '00000054-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Status Active"
 */

class StatusActive extends Characteristic {
	constructor() {
		super('Status Active', '00000075-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.StatusActive = StatusActive;
Characteristic.StatusActive.UUID = '00000075-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Status Fault"
 */

class StatusFault extends Characteristic {
	constructor() {
		super('Status Fault', '00000077-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.StatusFault = StatusFault;
Characteristic.StatusFault.UUID = '00000077-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Status Jammed"
 */

class StatusJammed extends Characteristic {
	constructor() {
		super('Status Jammed', '00000078-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.StatusJammed = StatusJammed;
Characteristic.StatusJammed.UUID = '00000078-0000-1000-8000-0026BB765291';

// The value property of StatusJammed must be one of the following:
Characteristic.StatusJammed.NOT_JAMMED = 0;
Characteristic.StatusJammed.JAMMED = 1;

/**
 * Characteristic "Status Low Battery"
 */

class StatusLowBattery extends Characteristic {
	constructor() {
		super('Status Low Battery', '00000079-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.StatusLowBattery = StatusLowBattery;
Characteristic.StatusLowBattery.UUID = '00000079-0000-1000-8000-0026BB765291';

// The value property of StatusLowBattery must be one of the following:
Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL = 0;
Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW = 1;

/**
 * Characteristic "Status Tampered"
 */

class StatusTampered extends Characteristic {
	constructor() {
		super('Status Tampered', '0000007A-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.StatusTampered = StatusTampered;
Characteristic.StatusTampered.UUID = '0000007A-0000-1000-8000-0026BB765291';

// The value property of StatusTampered must be one of the following:
Characteristic.StatusTampered.NOT_TAMPERED = 0;
Characteristic.StatusTampered.TAMPERED = 1;

/**
 * Characteristic "Target Door State"
 */

class TargetDoorState extends Characteristic {
	constructor() {
		super('Target Door State', '00000032-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetDoorState = TargetDoorState;
Characteristic.TargetDoorState.UUID = '00000032-0000-1000-8000-0026BB765291';

// The value property of TargetDoorState must be one of the following:
Characteristic.TargetDoorState.OPEN = 0;
Characteristic.TargetDoorState.CLOSED = 1;

/**
 * Characteristic "Target Heating Cooling State"
 */

class TargetHeatingCoolingState extends Characteristic {
	constructor() {
		super('Target Heating Cooling State', '00000033-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetHeatingCoolingState = TargetHeatingCoolingState;
Characteristic.TargetHeatingCoolingState.UUID = '00000033-0000-1000-8000-0026BB765291';

// The value property of TargetHeatingCoolingState must be one of the following:
Characteristic.TargetHeatingCoolingState.OFF = 0;
Characteristic.TargetHeatingCoolingState.HEAT = 1;
Characteristic.TargetHeatingCoolingState.COOL = 2;
Characteristic.TargetHeatingCoolingState.AUTO = 3;

/**
 * Characteristic "Target Horizontal Tilt Angle"
 */

class TargetHorizontalTiltAngle extends Characteristic {
	constructor() {
		super('Target Horizontal Tilt Angle', '0000007B-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
Characteristic.TargetHorizontalTiltAngle.UUID = '0000007B-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Position"
 */

class TargetPosition extends Characteristic {
	constructor() {
		super('Target Position', '0000007C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetPosition = TargetPosition;
Characteristic.TargetPosition.UUID = '0000007C-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Relative Humidity"
 */

class TargetRelativeHumidity extends Characteristic {
	constructor() {
		super('Target Relative Humidity', '00000034-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetRelativeHumidity = TargetRelativeHumidity;
Characteristic.TargetRelativeHumidity.UUID = '00000034-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Temperature"
 */

class TargetTemperature extends Characteristic {
	constructor() {
		super('Target Temperature', '00000035-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			unit: Characteristic.Units.CELSIUS,
			maxValue: 38,
			minValue: 10,
			minStep: 0.1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetTemperature = TargetTemperature;
Characteristic.TargetTemperature.UUID = '00000035-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Target Vertical Tilt Angle"
 */

class TargetVerticalTiltAngle extends Characteristic {
	constructor() {
		super('Target Vertical Tilt Angle', '0000007D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
Characteristic.TargetVerticalTiltAngle.UUID = '0000007D-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Temperature Display Units"
 */

class TemperatureDisplayUnits extends Characteristic {
	constructor() {
		super('Temperature Display Units', '00000036-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.WRITE, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TemperatureDisplayUnits = TemperatureDisplayUnits;
Characteristic.TemperatureDisplayUnits.UUID = '00000036-0000-1000-8000-0026BB765291';

// The value property of TemperatureDisplayUnits must be one of the following:
Characteristic.TemperatureDisplayUnits.CELSIUS = 0;
Characteristic.TemperatureDisplayUnits.FAHRENHEIT = 1;

/**
 * Characteristic "Time Update"
 */

class TimeUpdate extends Characteristic {
	constructor() {
		super('Time Update', '0000009A-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TimeUpdate = TimeUpdate;
Characteristic.TimeUpdate.UUID = '0000009A-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunnel Connection Timeout "
 */

class TunnelConnectionTimeout extends Characteristic {
	constructor() {
		super('Tunnel Connection Timeout ', '00000061-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT32,
			perms: [Characteristic.Perms.WRITE, Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TunnelConnectionTimeout = TunnelConnectionTimeout;
Characteristic.TunnelConnectionTimeout.UUID = '00000061-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunneled Accessory Advertising"
 */

class TunneledAccessoryAdvertising extends Characteristic {
	constructor() {
		super('Tunneled Accessory Advertising', '00000060-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.WRITE, Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TunneledAccessoryAdvertising = TunneledAccessoryAdvertising;
Characteristic.TunneledAccessoryAdvertising.UUID = '00000060-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunneled Accessory Connected"
 */

class TunneledAccessoryConnected extends Characteristic {
	constructor() {
		super('Tunneled Accessory Connected', '00000059-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.WRITE, Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TunneledAccessoryConnected = TunneledAccessoryConnected;
Characteristic.TunneledAccessoryConnected.UUID = '00000059-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Tunneled Accessory State Number"
 */

class TunneledAccessoryStateNumber extends Characteristic {
	constructor() {
		super('Tunneled Accessory State Number', '00000058-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.TunneledAccessoryStateNumber = TunneledAccessoryStateNumber;
Characteristic.TunneledAccessoryStateNumber.UUID = '00000058-0000-1000-8000-0026BB765291';

/**
 * Characteristic "Version"
 */

class Version extends Characteristic {
	constructor() {
		super('Version', '00000037-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
		});
	}
}

Characteristic.Version = Version;
Characteristic.Version.UUID = '00000037-0000-1000-8000-0026BB765291';

/**
 * Service "Accessory Information"
 */

class AccessoryInformation extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000003E-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Identify);
		this.addCharacteristic(Characteristic.Manufacturer);
		this.addCharacteristic(Characteristic.Model);
		this.addCharacteristic(Characteristic.Name);
		this.addCharacteristic(Characteristic.SerialNumber);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.FirmwareRevision);
		this.addOptionalCharacteristic(Characteristic.HardwareRevision);
		this.addOptionalCharacteristic(Characteristic.SoftwareRevision);
	}
}

Service.AccessoryInformation = AccessoryInformation;
Service.AccessoryInformation.UUID = '0000003E-0000-1000-8000-0026BB765291';
/**
 * Service "Air Quality Sensor"
 */

class AirQualitySensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008D-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.AirQuality);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.AirParticulateDensity);
		this.addOptionalCharacteristic(Characteristic.AirParticulateSize);
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.AirQualitySensor = AirQualitySensor;
Service.AirQualitySensor.UUID = '0000008D-0000-1000-8000-0026BB765291';
/**
 * Service "Battery Service"
 */

class BatteryService extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000096-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.BatteryLevel);
		this.addCharacteristic(Characteristic.ChargingState);
		this.addCharacteristic(Characteristic.StatusLowBattery);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.BatteryService = BatteryService;
Service.BatteryService.UUID = '00000096-0000-1000-8000-0026BB765291';
/**
 * Service "Bridge Configuration"
 */

class BridgeConfiguration extends Service {
	constructor(displayName, subType) {
		super(displayName, '000000A1-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ConfigureBridgedAccessoryStatus);
		this.addCharacteristic(Characteristic.DiscoverBridgedAccessories);
		this.addCharacteristic(Characteristic.DiscoveredBridgedAccessories);
		this.addCharacteristic(Characteristic.ConfigureBridgedAccessory);

  // Optional Characteristics
	}
}

Service.BridgeConfiguration = BridgeConfiguration;
Service.BridgeConfiguration.UUID = '000000A1-0000-1000-8000-0026BB765291';
/**
 * Service "Bridging State"
 */

class BridgingState extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000062-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Reachable);
		this.addCharacteristic(Characteristic.LinkQuality);
		this.addCharacteristic(Characteristic.AccessoryIdentifier);
		this.addCharacteristic(Characteristic.Category);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.BridgingState = BridgingState;
Service.BridgingState.UUID = '00000062-0000-1000-8000-0026BB765291';
/**
 * Service "Carbon Dioxide Sensor"
 */

class CarbonDioxideSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000097-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CarbonDioxideDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.CarbonDioxideLevel);
		this.addOptionalCharacteristic(Characteristic.CarbonDioxidePeakLevel);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.CarbonDioxideSensor = CarbonDioxideSensor;
Service.CarbonDioxideSensor.UUID = '00000097-0000-1000-8000-0026BB765291';
/**
 * Service "Carbon Monoxide Sensor"
 */

class CarbonMonoxideSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000007F-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CarbonMonoxideDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.CarbonMonoxideLevel);
		this.addOptionalCharacteristic(Characteristic.CarbonMonoxidePeakLevel);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.CarbonMonoxideSensor = CarbonMonoxideSensor;
Service.CarbonMonoxideSensor.UUID = '0000007F-0000-1000-8000-0026BB765291';
/**
 * Service "Contact Sensor"
 */

class ContactSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000080-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ContactSensorState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.ContactSensor = ContactSensor;
Service.ContactSensor.UUID = '00000080-0000-1000-8000-0026BB765291';
/**
 * Service "Door"
 */

class Door extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000081-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentPosition);
		this.addCharacteristic(Characteristic.PositionState);
		this.addCharacteristic(Characteristic.TargetPosition);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.HoldPosition);
		this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Door = Door;
Service.Door.UUID = '00000081-0000-1000-8000-0026BB765291';
/**
 * Service "Fan"
 */

class Fan extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000040-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.RotationDirection);
		this.addOptionalCharacteristic(Characteristic.RotationSpeed);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Fan = Fan;
Service.Fan.UUID = '00000040-0000-1000-8000-0026BB765291';
/**
 * Service "Garage Door Opener"
 */

class GarageDoorOpener extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000041-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentDoorState);
		this.addCharacteristic(Characteristic.TargetDoorState);
		this.addCharacteristic(Characteristic.ObstructionDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.LockCurrentState);
		this.addOptionalCharacteristic(Characteristic.LockTargetState);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.GarageDoorOpener = GarageDoorOpener;
Service.GarageDoorOpener.UUID = '00000041-0000-1000-8000-0026BB765291';
/**
 * Service "Humidity Sensor"
 */

class HumiditySensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000082-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentRelativeHumidity);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.HumiditySensor = HumiditySensor;
Service.HumiditySensor.UUID = '00000082-0000-1000-8000-0026BB765291';
/**
 * Service "Leak Sensor"
 */

class LeakSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000083-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.LeakDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.LeakSensor = LeakSensor;
Service.LeakSensor.UUID = '00000083-0000-1000-8000-0026BB765291';
/**
 * Service "Light Sensor"
 */

class LightSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000084-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentAmbientLightLevel);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.LightSensor = LightSensor;
Service.LightSensor.UUID = '00000084-0000-1000-8000-0026BB765291';
/**
 * Service "Lightbulb"
 */

class Lightbulb extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000043-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Brightness);
		this.addOptionalCharacteristic(Characteristic.Hue);
		this.addOptionalCharacteristic(Characteristic.Saturation);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Lightbulb = Lightbulb;
Service.Lightbulb.UUID = '00000043-0000-1000-8000-0026BB765291';
/**
 * Service "Lock Management"
 */

class LockManagement extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000044-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.LockControlPoint);
		this.addCharacteristic(Characteristic.Version);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Logs);
		this.addOptionalCharacteristic(Characteristic.AudioFeedback);
		this.addOptionalCharacteristic(Characteristic.LockManagementAutoSecurityTimeout);
		this.addOptionalCharacteristic(Characteristic.AdministratorOnlyAccess);
		this.addOptionalCharacteristic(Characteristic.LockLastKnownAction);
		this.addOptionalCharacteristic(Characteristic.CurrentDoorState);
		this.addOptionalCharacteristic(Characteristic.MotionDetected);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.LockManagement = LockManagement;
Service.LockManagement.UUID = '00000044-0000-1000-8000-0026BB765291';
/**
 * Service "Lock Mechanism"
 */

class LockMechanism extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000045-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.LockCurrentState);
		this.addCharacteristic(Characteristic.LockTargetState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.LockMechanism = LockMechanism;
Service.LockMechanism.UUID = '00000045-0000-1000-8000-0026BB765291';
/**
 * Service "Motion Sensor"
 */

class MotionSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000085-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.MotionDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.MotionSensor = MotionSensor;
Service.MotionSensor.UUID = '00000085-0000-1000-8000-0026BB765291';
/**
 * Service "Occupancy Sensor"
 */

class OccupancySensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000086-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.OccupancyDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.OccupancySensor = OccupancySensor;
Service.OccupancySensor.UUID = '00000086-0000-1000-8000-0026BB765291';
/**
 * Service "Outlet"
 */

class Outlet extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000047-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.On);
		this.addCharacteristic(Characteristic.OutletInUse);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Outlet = Outlet;
Service.Outlet.UUID = '00000047-0000-1000-8000-0026BB765291';
/**
 * Service "Security System"
 */

class SecuritySystem extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000007E-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.SecuritySystemCurrentState);
		this.addCharacteristic(Characteristic.SecuritySystemTargetState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.SecuritySystemAlarmType);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.SecuritySystem = SecuritySystem;
Service.SecuritySystem.UUID = '0000007E-0000-1000-8000-0026BB765291';
/**
 * Service "Smoke Sensor"
 */

class SmokeSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000087-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.SmokeDetected);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.SmokeSensor = SmokeSensor;
Service.SmokeSensor.UUID = '00000087-0000-1000-8000-0026BB765291';
/**
 * Service "Stateful Programmable Switch"
 */

class StatefulProgrammableSwitch extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000088-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);
		this.addCharacteristic(Characteristic.ProgrammableSwitchOutputState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.StatefulProgrammableSwitch = StatefulProgrammableSwitch;
Service.StatefulProgrammableSwitch.UUID = '00000088-0000-1000-8000-0026BB765291';
/**
 * Service "Stateless Programmable Switch"
 */

class StatelessProgrammableSwitch extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000089-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
Service.StatelessProgrammableSwitch.UUID = '00000089-0000-1000-8000-0026BB765291';
/**
 * Service "Switch"
 */

class Switch extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000049-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Switch = Switch;
Service.Switch.UUID = '00000049-0000-1000-8000-0026BB765291';
/**
 * Service "Temperature Sensor"
 */

class TemperatureSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008A-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentTemperature);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.TemperatureSensor = TemperatureSensor;
Service.TemperatureSensor.UUID = '0000008A-0000-1000-8000-0026BB765291';
/**
 * Service "Thermostat"
 */

class Thermostat extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000004A-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentHeatingCoolingState);
		this.addCharacteristic(Characteristic.TargetHeatingCoolingState);
		this.addCharacteristic(Characteristic.CurrentTemperature);
		this.addCharacteristic(Characteristic.TargetTemperature);
		this.addCharacteristic(Characteristic.TemperatureDisplayUnits);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.CurrentRelativeHumidity);
		this.addOptionalCharacteristic(Characteristic.TargetRelativeHumidity);
		this.addOptionalCharacteristic(Characteristic.CoolingThresholdTemperature);
		this.addOptionalCharacteristic(Characteristic.HeatingThresholdTemperature);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Thermostat = Thermostat;
Service.Thermostat.UUID = '0000004A-0000-1000-8000-0026BB765291';
/**
 * Service "Time Information"
 */

class TimeInformation extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000099-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentTime);
		this.addCharacteristic(Characteristic.DayoftheWeek);
		this.addCharacteristic(Characteristic.TimeUpdate);

  // Optional Characteristics
	}
}

Service.TimeInformation = TimeInformation;
Service.TimeInformation.UUID = '00000099-0000-1000-8000-0026BB765291';
/**
 * Service "Tunneled BTLE Accessory Service"
 */

class TunneledBTLEAccessoryService extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000056-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Name);
		this.addCharacteristic(Characteristic.AccessoryIdentifier);
		this.addCharacteristic(Characteristic.TunneledAccessoryStateNumber);
		this.addCharacteristic(Characteristic.TunneledAccessoryConnected);
		this.addCharacteristic(Characteristic.TunneledAccessoryAdvertising);
		this.addCharacteristic(Characteristic.TunnelConnectionTimeout);

  // Optional Characteristics
	}
}

Service.TunneledBTLEAccessoryService = TunneledBTLEAccessoryService;
Service.TunneledBTLEAccessoryService.UUID = '00000056-0000-1000-8000-0026BB765291';
/**
 * Service "Window"
 */

class Window extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008B-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentPosition);
		this.addCharacteristic(Characteristic.TargetPosition);
		this.addCharacteristic(Characteristic.PositionState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.HoldPosition);
		this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Window = Window;
Service.Window.UUID = '0000008B-0000-1000-8000-0026BB765291';
/**
 * Service "Window Covering"
 */

class WindowCovering extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008C-0000-1000-8000-0026BB765291', subtype);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentPosition);
		this.addCharacteristic(Characteristic.TargetPosition);
		this.addCharacteristic(Characteristic.PositionState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.HoldPosition);
		this.addOptionalCharacteristic(Characteristic.TargetHorizontalTiltAngle);
		this.addOptionalCharacteristic(Characteristic.TargetVerticalTiltAngle);
		this.addOptionalCharacteristic(Characteristic.CurrentHorizontalTiltAngle);
		this.addOptionalCharacteristic(Characteristic.CurrentVerticalTiltAngle);
		this.addOptionalCharacteristic(Characteristic.ObstructionDetected);
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.WindowCovering = WindowCovering;
Service.WindowCovering.UUID = '0000008C-0000-1000-8000-0026BB765291';
const HomeKitTypesBridge = require('./HomeKitTypes-Bridge');

