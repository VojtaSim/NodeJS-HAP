// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY

const Characteristic = require('../src/Characteristic');

/**
 * Characteristic "Accessory Flags"
 */

class AccessoryFlags extends Characteristic {
	constructor() {
		super('Accessory Flags', '000000A6-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT32,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			validValues: [1]
		});
	}
}

Characteristic.AccessoryFlags = AccessoryFlags;
Characteristic.AccessoryFlags.UUID = '000000A6-0000-1000-8000-0026BB765291';

// The value property of AccessoryFlags must be one of the following:

/**
 * Characteristic "Active"
 */

class Active extends Characteristic {
	constructor() {
		super('Active', '000000B0-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.Active = Active;
Characteristic.Active.UUID = '000000B0-0000-1000-8000-0026BB765291';

// The value property of Active must be one of the following:
Characteristic.Active.INACTIVE = 0;
Characteristic.Active.ACTIVE = 0;

/**
 * Characteristic "Administrator Only Access"
 */

class AdministratorOnlyAccess extends Characteristic {
	constructor() {
		super('Administrator Only Access', '00000001-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.AdministratorOnlyAccess = AdministratorOnlyAccess;
Characteristic.AdministratorOnlyAccess.UUID = '00000001-0000-1000-8000-0026BB765291';

// The value property of AdministratorOnlyAccess must be one of the following:

/**
 * Characteristic "Air Particulate Density"
 */

class AirParticulateDensity extends Characteristic {
	constructor() {
		super('Air Particulate Density', '00000064-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1000,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.AirParticulateDensity = AirParticulateDensity;
Characteristic.AirParticulateDensity.UUID = '00000064-0000-1000-8000-0026BB765291';

// The value property of AirParticulateDensity must be one of the following:

/**
 * Characteristic "Air Particulate Size"
 */

class AirParticulateSize extends Characteristic {
	constructor() {
		super('Air Particulate Size', '00000065-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 5,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.AudioFeedback = AudioFeedback;
Characteristic.AudioFeedback.UUID = '00000005-0000-1000-8000-0026BB765291';

// The value property of AudioFeedback must be one of the following:

/**
 * Characteristic "Battery Level"
 */

class BatteryLevel extends Characteristic {
	constructor() {
		super('Battery Level', '00000068-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.BatteryLevel = BatteryLevel;
Characteristic.BatteryLevel.UUID = '00000068-0000-1000-8000-0026BB765291';

// The value property of BatteryLevel must be one of the following:

/**
 * Characteristic "Brightness"
 */

class Brightness extends Characteristic {
	constructor() {
		super('Brightness', '00000008-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.Brightness = Brightness;
Characteristic.Brightness.UUID = '00000008-0000-1000-8000-0026BB765291';

// The value property of Brightness must be one of the following:

/**
 * Characteristic "Carbon Dioxide Detected"
 */

class CarbonDioxideDetected extends Characteristic {
	constructor() {
		super('Carbon Dioxide Detected', '00000092-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 100000,
			minValue: 0,
			minStep: 100
		});
	}
}

Characteristic.CarbonDioxideLevel = CarbonDioxideLevel;
Characteristic.CarbonDioxideLevel.UUID = '00000093-0000-1000-8000-0026BB765291';

// The value property of CarbonDioxideLevel must be one of the following:

/**
 * Characteristic "Carbon Dioxide Peak Level"
 */

class CarbonDioxidePeakLevel extends Characteristic {
	constructor() {
		super('Carbon Dioxide Peak Level', '00000094-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 100000,
			minValue: 0,
			minStep: 100
		});
	}
}

Characteristic.CarbonDioxidePeakLevel = CarbonDioxidePeakLevel;
Characteristic.CarbonDioxidePeakLevel.UUID = '00000094-0000-1000-8000-0026BB765291';

// The value property of CarbonDioxidePeakLevel must be one of the following:

/**
 * Characteristic "Carbon Monoxide Detected"
 */

class CarbonMonoxideDetected extends Characteristic {
	constructor() {
		super('Carbon Monoxide Detected', '00000069-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 100,
			minValue: 0,
			minStep: 0.1
		});
	}
}

Characteristic.CarbonMonoxideLevel = CarbonMonoxideLevel;
Characteristic.CarbonMonoxideLevel.UUID = '00000090-0000-1000-8000-0026BB765291';

// The value property of CarbonMonoxideLevel must be one of the following:

/**
 * Characteristic "Carbon Monoxide Peak Level"
 */

class CarbonMonoxidePeakLevel extends Characteristic {
	constructor() {
		super('Carbon Monoxide Peak Level', '00000091-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 100,
			minValue: 0,
			minStep: 0.1
		});
	}
}

Characteristic.CarbonMonoxidePeakLevel = CarbonMonoxidePeakLevel;
Characteristic.CarbonMonoxidePeakLevel.UUID = '00000091-0000-1000-8000-0026BB765291';

// The value property of CarbonMonoxidePeakLevel must be one of the following:

/**
 * Characteristic "Charging State"
 */

class ChargingState extends Characteristic {
	constructor() {
		super('Charging State', '0000008F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.ChargingState = ChargingState;
Characteristic.ChargingState.UUID = '0000008F-0000-1000-8000-0026BB765291';

// The value property of ChargingState must be one of the following:
Characteristic.ChargingState.NOT_CHARGING = 0;
Characteristic.ChargingState.CHARGING = 1;

/**
 * Characteristic "Color Temperature"
 */

class ColorTemperature extends Characteristic {
	constructor() {
		super('Color Temperature', '000000CE-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT32,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 400,
			minValue: 50,
			minStep: 1
		});
	}
}

Characteristic.ColorTemperature = ColorTemperature;
Characteristic.ColorTemperature.UUID = '000000CE-0000-1000-8000-0026BB765291';

// The value property of ColorTemperature must be one of the following:

/**
 * Characteristic "Contact Sensor State"
 */

class ContactSensorState extends Characteristic {
	constructor() {
		super('Contact Sensor State', '0000006A-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.CELSIUS,
			maxValue: 35,
			minValue: 10,
			minStep: 0.1
		});
	}
}

Characteristic.CoolingThresholdTemperature = CoolingThresholdTemperature;
Characteristic.CoolingThresholdTemperature.UUID = '0000000D-0000-1000-8000-0026BB765291';

// The value property of CoolingThresholdTemperature must be one of the following:

/**
 * Characteristic "Current Air Purifier State"
 */

class CurrentAirPurifierState extends Characteristic {
	constructor() {
		super('Current Air Purifier State', '000000A9-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 2,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.CurrentAirPurifierState = CurrentAirPurifierState;
Characteristic.CurrentAirPurifierState.UUID = '000000A9-0000-1000-8000-0026BB765291';

// The value property of CurrentAirPurifierState must be one of the following:
Characteristic.CurrentAirPurifierState.INACTIVE = 0;
Characteristic.CurrentAirPurifierState.IDLE = 1;
Characteristic.CurrentAirPurifierState.PURIFYING = 2;

/**
 * Characteristic "Current Ambient Light Level"
 */

class CurrentAmbientLightLevel extends Characteristic {
	constructor() {
		super('Current Ambient Light Level', '0000006B-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.LUX,
			maxValue: 100000,
			minValue: 0.0001,
			minStep: 0.0001
		});
	}
}

Characteristic.CurrentAmbientLightLevel = CurrentAmbientLightLevel;
Characteristic.CurrentAmbientLightLevel.UUID = '0000006B-0000-1000-8000-0026BB765291';

// The value property of CurrentAmbientLightLevel must be one of the following:

/**
 * Characteristic "Current Door State"
 */

class CurrentDoorState extends Characteristic {
	constructor() {
		super('Current Door State', '0000000E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 4,
			minValue: 0,
			minStep: 1
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
 * Characteristic "Current Fan State"
 */

class CurrentFanState extends Characteristic {
	constructor() {
		super('Current Fan State', '000000AF-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 2,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.CurrentFanState = CurrentFanState;
Characteristic.CurrentFanState.UUID = '000000AF-0000-1000-8000-0026BB765291';

// The value property of CurrentFanState must be one of the following:
Characteristic.CurrentFanState.INACTIVE = 0;
Characteristic.CurrentFanState.IDLE = 1;
Characteristic.CurrentFanState.BLOWING = 2;

/**
 * Characteristic "Current Heating Cooling State"
 */

class CurrentHeatingCoolingState extends Characteristic {
	constructor() {
		super('Current Heating Cooling State', '0000000F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 2,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.CurrentHorizontalTiltAngle = CurrentHorizontalTiltAngle;
Characteristic.CurrentHorizontalTiltAngle.UUID = '0000006C-0000-1000-8000-0026BB765291';

// The value property of CurrentHorizontalTiltAngle must be one of the following:

/**
 * Characteristic "Current Position"
 */

class CurrentPosition extends Characteristic {
	constructor() {
		super('Current Position', '0000006D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.CurrentPosition = CurrentPosition;
Characteristic.CurrentPosition.UUID = '0000006D-0000-1000-8000-0026BB765291';

// The value property of CurrentPosition must be one of the following:

/**
 * Characteristic "Current Relative Humidity"
 */

class CurrentRelativeHumidity extends Characteristic {
	constructor() {
		super('Current Relative Humidity', '00000010-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.CurrentRelativeHumidity = CurrentRelativeHumidity;
Characteristic.CurrentRelativeHumidity.UUID = '00000010-0000-1000-8000-0026BB765291';

// The value property of CurrentRelativeHumidity must be one of the following:

/**
 * Characteristic "Current Slat State"
 */

class CurrentSlatState extends Characteristic {
	constructor() {
		super('Current Slat State', '000000AA-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 2,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.CurrentSlatState = CurrentSlatState;
Characteristic.CurrentSlatState.UUID = '000000AA-0000-1000-8000-0026BB765291';

// The value property of CurrentSlatState must be one of the following:
Characteristic.CurrentSlatState.FIXED = 0;
Characteristic.CurrentSlatState.JAMMED = 1;
Characteristic.CurrentSlatState.SWINGING = 2;

/**
 * Characteristic "Current Temperature"
 */

class CurrentTemperature extends Characteristic {
	constructor() {
		super('Current Temperature', '00000011-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.CELSIUS,
			maxValue: 100,
			minValue: 0,
			minStep: 0.1
		});
	}
}

Characteristic.CurrentTemperature = CurrentTemperature;
Characteristic.CurrentTemperature.UUID = '00000011-0000-1000-8000-0026BB765291';

// The value property of CurrentTemperature must be one of the following:

/**
 * Characteristic "Current Tilt Angle"
 */

class CurrentTiltAngle extends Characteristic {
	constructor() {
		super('Current Tilt Angle', '000000C1-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.CurrentTiltAngle = CurrentTiltAngle;
Characteristic.CurrentTiltAngle.UUID = '000000C1-0000-1000-8000-0026BB765291';

// The value property of CurrentTiltAngle must be one of the following:

/**
 * Characteristic "Current Vertical Tilt Angle"
 */

class CurrentVerticalTiltAngle extends Characteristic {
	constructor() {
		super('Current Vertical Tilt Angle', '0000006E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.CurrentVerticalTiltAngle = CurrentVerticalTiltAngle;
Characteristic.CurrentVerticalTiltAngle.UUID = '0000006E-0000-1000-8000-0026BB765291';

// The value property of CurrentVerticalTiltAngle must be one of the following:

/**
 * Characteristic "Digital Zoom"
 */

class DigitalZoom extends Characteristic {
	constructor() {
		super('Digital Zoom', '0000011D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.DigitalZoom = DigitalZoom;
Characteristic.DigitalZoom.UUID = '0000011D-0000-1000-8000-0026BB765291';

// The value property of DigitalZoom must be one of the following:

/**
 * Characteristic "Filter Change Indication"
 */

class FilterChangeIndication extends Characteristic {
	constructor() {
		super('Filter Change Indication', '000000AC-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.FilterChangeIndication = FilterChangeIndication;
Characteristic.FilterChangeIndication.UUID = '000000AC-0000-1000-8000-0026BB765291';

// The value property of FilterChangeIndication must be one of the following:
Characteristic.FilterChangeIndication.DOES_NOT_NEED_CHANGE = 1;
Characteristic.FilterChangeIndication.NEEDS_CHANGE = 1;

/**
 * Characteristic "Filter Life Level"
 */

class FilterLifeLevel extends Characteristic {
	constructor() {
		super('Filter Life Level', '000000AB-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.FilterLifeLevel = FilterLifeLevel;
Characteristic.FilterLifeLevel.UUID = '000000AB-0000-1000-8000-0026BB765291';

// The value property of FilterLifeLevel must be one of the following:

/**
 * Characteristic "Firmware Revision"
 */

class FirmwareRevision extends Characteristic {
	constructor() {
		super('Firmware Revision', '00000052-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.FirmwareRevision = FirmwareRevision;
Characteristic.FirmwareRevision.UUID = '00000052-0000-1000-8000-0026BB765291';

// The value property of FirmwareRevision must be one of the following:

/**
 * Characteristic "Hardware Revision"
 */

class HardwareRevision extends Characteristic {
	constructor() {
		super('Hardware Revision', '00000053-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.HardwareRevision = HardwareRevision;
Characteristic.HardwareRevision.UUID = '00000053-0000-1000-8000-0026BB765291';

// The value property of HardwareRevision must be one of the following:

/**
 * Characteristic "Heating Threshold Temperature"
 */

class HeatingThresholdTemperature extends Characteristic {
	constructor() {
		super('Heating Threshold Temperature', '00000012-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.CELSIUS,
			maxValue: 25,
			minValue: 0,
			minStep: 0.1
		});
	}
}

Characteristic.HeatingThresholdTemperature = HeatingThresholdTemperature;
Characteristic.HeatingThresholdTemperature.UUID = '00000012-0000-1000-8000-0026BB765291';

// The value property of HeatingThresholdTemperature must be one of the following:

/**
 * Characteristic "Hold Position"
 */

class HoldPosition extends Characteristic {
	constructor() {
		super('Hold Position', '0000006F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.HoldPosition = HoldPosition;
Characteristic.HoldPosition.UUID = '0000006F-0000-1000-8000-0026BB765291';

// The value property of HoldPosition must be one of the following:

/**
 * Characteristic "Hue"
 */

class Hue extends Characteristic {
	constructor() {
		super('Hue', '00000013-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 360,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.Hue = Hue;
Characteristic.Hue.UUID = '00000013-0000-1000-8000-0026BB765291';

// The value property of Hue must be one of the following:

/**
 * Characteristic "Identify"
 */

class Identify extends Characteristic {
	constructor() {
		super('Identify', '00000014-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.Identify = Identify;
Characteristic.Identify.UUID = '00000014-0000-1000-8000-0026BB765291';

// The value property of Identify must be one of the following:

/**
 * Characteristic "Image Mirroring"
 */

class ImageMirroring extends Characteristic {
	constructor() {
		super('Image Mirroring', '0000011F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.ImageMirroring = ImageMirroring;
Characteristic.ImageMirroring.UUID = '0000011F-0000-1000-8000-0026BB765291';

// The value property of ImageMirroring must be one of the following:

/**
 * Characteristic "Image Rotation"
 */

class ImageRotation extends Characteristic {
	constructor() {
		super('Image Rotation', '0000011E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			validValues: [0,90,180,270]
		});
	}
}

Characteristic.ImageRotation = ImageRotation;
Characteristic.ImageRotation.UUID = '0000011E-0000-1000-8000-0026BB765291';

// The value property of ImageRotation must be one of the following:

/**
 * Characteristic "Leak Detected"
 */

class LeakDetected extends Characteristic {
	constructor() {
		super('Leak Detected', '00000070-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.LeakDetected = LeakDetected;
Characteristic.LeakDetected.UUID = '00000070-0000-1000-8000-0026BB765291';

// The value property of LeakDetected must be one of the following:
Characteristic.LeakDetected.LEAK_NOT_DETECTED = 0;
Characteristic.LeakDetected.LEAK_DETECTED = 1;

/**
 * Characteristic "Lock Control Point"
 */

class LockControlPoint extends Characteristic {
	constructor() {
		super('Lock Control Point', '00000019-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.LockControlPoint = LockControlPoint;
Characteristic.LockControlPoint.UUID = '00000019-0000-1000-8000-0026BB765291';

// The value property of LockControlPoint must be one of the following:

/**
 * Characteristic "Lock Current State"
 */

class LockCurrentState extends Characteristic {
	constructor() {
		super('Lock Current State', '0000001D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 3,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 8,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.SECONDS,
			maxValue: 86400,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.LockManagementAutoSecurityTimeout = LockManagementAutoSecurityTimeout;
Characteristic.LockManagementAutoSecurityTimeout.UUID = '0000001A-0000-1000-8000-0026BB765291';

// The value property of LockManagementAutoSecurityTimeout must be one of the following:

/**
 * Characteristic "Lock Physical Controls"
 */

class LockPhysicalControls extends Characteristic {
	constructor() {
		super('Lock Physical Controls', '000000A7-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.LockPhysicalControls = LockPhysicalControls;
Characteristic.LockPhysicalControls.UUID = '000000A7-0000-1000-8000-0026BB765291';

// The value property of LockPhysicalControls must be one of the following:
Characteristic.LockPhysicalControls.DISABLED = 0;
Characteristic.LockPhysicalControls.ENABLED = 1;

/**
 * Characteristic "Lock Target State"
 */

class LockTargetState extends Characteristic {
	constructor() {
		super('Lock Target State', '0000001E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.Logs = Logs;
Characteristic.Logs.UUID = '0000001F-0000-1000-8000-0026BB765291';

// The value property of Logs must be one of the following:

/**
 * Characteristic "Manufacturer"
 */

class Manufacturer extends Characteristic {
	constructor() {
		super('Manufacturer', '00000020-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.Manufacturer = Manufacturer;
Characteristic.Manufacturer.UUID = '00000020-0000-1000-8000-0026BB765291';

// The value property of Manufacturer must be one of the following:

/**
 * Characteristic "Model"
 */

class Model extends Characteristic {
	constructor() {
		super('Model', '00000021-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.Model = Model;
Characteristic.Model.UUID = '00000021-0000-1000-8000-0026BB765291';

// The value property of Model must be one of the following:

/**
 * Characteristic "Motion Detected"
 */

class MotionDetected extends Characteristic {
	constructor() {
		super('Motion Detected', '00000022-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.MotionDetected = MotionDetected;
Characteristic.MotionDetected.UUID = '00000022-0000-1000-8000-0026BB765291';

// The value property of MotionDetected must be one of the following:

/**
 * Characteristic "Mute"
 */

class Mute extends Characteristic {
	constructor() {
		super('Mute', '00000119-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.Mute = Mute;
Characteristic.Mute.UUID = '00000119-0000-1000-8000-0026BB765291';

// The value property of Mute must be one of the following:

/**
 * Characteristic "Name"
 */

class Name extends Characteristic {
	constructor() {
		super('Name', '00000023-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.Name = Name;
Characteristic.Name.UUID = '00000023-0000-1000-8000-0026BB765291';

// The value property of Name must be one of the following:

/**
 * Characteristic "Night Vision"
 */

class NightVision extends Characteristic {
	constructor() {
		super('Night Vision', '0000011B-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.NightVision = NightVision;
Characteristic.NightVision.UUID = '0000011B-0000-1000-8000-0026BB765291';

// The value property of NightVision must be one of the following:

/**
 * Characteristic "Nitrogen Dioxide Density"
 */

class NitrogenDioxideDensity extends Characteristic {
	constructor() {
		super('Nitrogen Dioxide Density', '000000C4-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1000,
			minValue: 0
		});
	}
}

Characteristic.NitrogenDioxideDensity = NitrogenDioxideDensity;
Characteristic.NitrogenDioxideDensity.UUID = '000000C4-0000-1000-8000-0026BB765291';

// The value property of NitrogenDioxideDensity must be one of the following:

/**
 * Characteristic "Obstruction Detected"
 */

class ObstructionDetected extends Characteristic {
	constructor() {
		super('Obstruction Detected', '00000024-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.ObstructionDetected = ObstructionDetected;
Characteristic.ObstructionDetected.UUID = '00000024-0000-1000-8000-0026BB765291';

// The value property of ObstructionDetected must be one of the following:

/**
 * Characteristic "Occupancy Detected"
 */

class OccupancyDetected extends Characteristic {
	constructor() {
		super('Occupancy Detected', '00000071-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.On = On;
Characteristic.On.UUID = '00000025-0000-1000-8000-0026BB765291';

// The value property of On must be one of the following:

/**
 * Characteristic "Optical Zoom"
 */

class OpticalZoom extends Characteristic {
	constructor() {
		super('Optical Zoom', '0000011C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.OpticalZoom = OpticalZoom;
Characteristic.OpticalZoom.UUID = '0000011C-0000-1000-8000-0026BB765291';

// The value property of OpticalZoom must be one of the following:

/**
 * Characteristic "Outlet In Use"
 */

class OutletInUse extends Characteristic {
	constructor() {
		super('Outlet In Use', '00000026-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.OutletInUse = OutletInUse;
Characteristic.OutletInUse.UUID = '00000026-0000-1000-8000-0026BB765291';

// The value property of OutletInUse must be one of the following:

/**
 * Characteristic "Target Tilt Angle"
 */

class OzoneDensity extends Characteristic {
	constructor() {
		super('Target Tilt Angle', '000000C2-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.OzoneDensity = OzoneDensity;
Characteristic.OzoneDensity.UUID = '000000C2-0000-1000-8000-0026BB765291';

// The value property of OzoneDensity must be one of the following:

/**
 * Characteristic "Pairing Features"
 */

class PairingFeatures extends Characteristic {
	constructor() {
		super('Pairing Features', '0000004F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.PairingFeatures = PairingFeatures;
Characteristic.PairingFeatures.UUID = '0000004F-0000-1000-8000-0026BB765291';

// The value property of PairingFeatures must be one of the following:

/**
 * Characteristic "Pairing Pairings"
 */

class PairingPairings extends Characteristic {
	constructor() {
		super('Pairing Pairings', '00000050-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.PairingPairings = PairingPairings;
Characteristic.PairingPairings.UUID = '00000050-0000-1000-8000-0026BB765291';

// The value property of PairingPairings must be one of the following:

/**
 * Characteristic "Pair Setup"
 */

class PairSetup extends Characteristic {
	constructor() {
		super('Pair Setup', '0000004C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.PairSetup = PairSetup;
Characteristic.PairSetup.UUID = '0000004C-0000-1000-8000-0026BB765291';

// The value property of PairSetup must be one of the following:

/**
 * Characteristic "Pair Verify"
 */

class PairVerify extends Characteristic {
	constructor() {
		super('Pair Verify', '0000004E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.PairVerify = PairVerify;
Characteristic.PairVerify.UUID = '0000004E-0000-1000-8000-0026BB765291';

// The value property of PairVerify must be one of the following:

/**
 * Characteristic "PM10 Density"
 */

class PM10_Density extends Characteristic {
	constructor() {
		super('PM10 Density', '000000C7-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1000,
			minValue: 0
		});
	}
}

Characteristic.PM10_Density = PM10_Density;
Characteristic.PM10_Density.UUID = '000000C7-0000-1000-8000-0026BB765291';

// The value property of PM10_Density must be one of the following:

/**
 * Characteristic "PM2.5 Density"
 */

class PM2_5_Density extends Characteristic {
	constructor() {
		super('PM2.5 Density', '000000C6-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1000,
			minValue: 0
		});
	}
}

Characteristic.PM2_5_Density = PM2_5_Density;
Characteristic.PM2_5_Density.UUID = '000000C6-0000-1000-8000-0026BB765291';

// The value property of PM2_5_Density must be one of the following:

/**
 * Characteristic "Position State"
 */

class PositionState extends Characteristic {
	constructor() {
		super('Position State', '00000072-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 2,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 2,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.ProgrammableSwitchEvent = ProgrammableSwitchEvent;
Characteristic.ProgrammableSwitchEvent.UUID = '00000073-0000-1000-8000-0026BB765291';

// The value property of ProgrammableSwitchEvent must be one of the following:
Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS = 0;
Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS = 1;
Characteristic.ProgrammableSwitchEvent.LONG_PRESS = 2;

/**
 * Characteristic "Reset Filter Indication"
 */

class ResetFilterIndication extends Characteristic {
	constructor() {
		super('Reset Filter Indication', '000000AD-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_WRITE],
			maxValue: 1,
			minValue: 1
		});
	}
}

Characteristic.ResetFilterIndication = ResetFilterIndication;
Characteristic.ResetFilterIndication.UUID = '000000AD-0000-1000-8000-0026BB765291';

// The value property of ResetFilterIndication must be one of the following:

/**
 * Characteristic "Rotation Direction"
 */

class RotationDirection extends Characteristic {
	constructor() {
		super('Rotation Direction', '00000028-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.RotationSpeed = RotationSpeed;
Characteristic.RotationSpeed.UUID = '00000029-0000-1000-8000-0026BB765291';

// The value property of RotationSpeed must be one of the following:

/**
 * Characteristic "Saturation"
 */

class Saturation extends Characteristic {
	constructor() {
		super('Saturation', '0000002F-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.Saturation = Saturation;
Characteristic.Saturation.UUID = '0000002F-0000-1000-8000-0026BB765291';

// The value property of Saturation must be one of the following:

/**
 * Characteristic "Security System Alarm Type"
 */

class SecuritySystemAlarmType extends Characteristic {
	constructor() {
		super('Security System Alarm Type', '0000008E-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.SecuritySystemAlarmType = SecuritySystemAlarmType;
Characteristic.SecuritySystemAlarmType.UUID = '0000008E-0000-1000-8000-0026BB765291';

// The value property of SecuritySystemAlarmType must be one of the following:

/**
 * Characteristic "Security System Current State"
 */

class SecuritySystemCurrentState extends Characteristic {
	constructor() {
		super('Security System Current State', '00000066-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 4,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 3,
			minValue: 0,
			minStep: 1
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
 * Characteristic "Selected RTP Stream Configuration"
 */

class SelectedRTPStreamConfiguration extends Characteristic {
	constructor() {
		super('Selected RTP Stream Configuration', '00000117-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.SelectedRTPStreamConfiguration = SelectedRTPStreamConfiguration;
Characteristic.SelectedRTPStreamConfiguration.UUID = '00000117-0000-1000-8000-0026BB765291';

// The value property of SelectedRTPStreamConfiguration must be one of the following:

/**
 * Characteristic "Serial Number"
 */

class SerialNumber extends Characteristic {
	constructor() {
		super('Serial Number', '00000030-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.SerialNumber = SerialNumber;
Characteristic.SerialNumber.UUID = '00000030-0000-1000-8000-0026BB765291';

// The value property of SerialNumber must be one of the following:

/**
 * Characteristic "Service Label Index"
 */

class ServiceLabelIndex extends Characteristic {
	constructor() {
		super('Service Label Index', '000000CB-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ],
			minValue: 1,
			minStep: 1
		});
	}
}

Characteristic.ServiceLabelIndex = ServiceLabelIndex;
Characteristic.ServiceLabelIndex.UUID = '000000CB-0000-1000-8000-0026BB765291';

// The value property of ServiceLabelIndex must be one of the following:

/**
 * Characteristic "Service Label Namespace"
 */

class ServiceLabelNamespace extends Characteristic {
	constructor() {
		super('Service Label Namespace', '000000CD-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.ServiceLabelNamespace = ServiceLabelNamespace;
Characteristic.ServiceLabelNamespace.UUID = '000000CD-0000-1000-8000-0026BB765291';

// The value property of ServiceLabelNamespace must be one of the following:

/**
 * Characteristic "Setup Endpoints"
 */

class SetupEndpoints extends Characteristic {
	constructor() {
		super('Setup Endpoints', '00000118-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE]
		});
	}
}

Characteristic.SetupEndpoints = SetupEndpoints;
Characteristic.SetupEndpoints.UUID = '00000118-0000-1000-8000-0026BB765291';

// The value property of SetupEndpoints must be one of the following:

/**
 * Characteristic "Slat Type"
 */

class SlatType extends Characteristic {
	constructor() {
		super('Slat Type', '000000C0-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.SlatType = SlatType;
Characteristic.SlatType.UUID = '000000C0-0000-1000-8000-0026BB765291';

// The value property of SlatType must be one of the following:
Characteristic.SlatType.HORIZONTAL = 0;
Characteristic.SlatType.VERTICAL = 1;

/**
 * Characteristic "Smoke Detected"
 */

class SmokeDetected extends Characteristic {
	constructor() {
		super('Smoke Detected', '00000076-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.SmokeDetected = SmokeDetected;
Characteristic.SmokeDetected.UUID = '00000076-0000-1000-8000-0026BB765291';

// The value property of SmokeDetected must be one of the following:
Characteristic.SmokeDetected.SMOKE_NOT_DETECTED = 0;
Characteristic.SmokeDetected.SMOKE_DETECTED = 1;

/**
 * Characteristic "Status Active"
 */

class StatusActive extends Characteristic {
	constructor() {
		super('Status Active', '00000075-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.BOOL,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.StatusActive = StatusActive;
Characteristic.StatusActive.UUID = '00000075-0000-1000-8000-0026BB765291';

// The value property of StatusActive must be one of the following:

/**
 * Characteristic "Status Fault"
 */

class StatusFault extends Characteristic {
	constructor() {
		super('Status Fault', '00000077-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.StatusFault = StatusFault;
Characteristic.StatusFault.UUID = '00000077-0000-1000-8000-0026BB765291';

// The value property of StatusFault must be one of the following:
Characteristic.StatusFault.NO_FAULT = 0;
Characteristic.StatusFault.GENERAL_FAULT = 1;

/**
 * Characteristic "Status Jammed"
 */

class StatusJammed extends Characteristic {
	constructor() {
		super('Status Jammed', '00000078-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.StatusTampered = StatusTampered;
Characteristic.StatusTampered.UUID = '0000007A-0000-1000-8000-0026BB765291';

// The value property of StatusTampered must be one of the following:
Characteristic.StatusTampered.NOT_TAMPERED = 0;
Characteristic.StatusTampered.TAMPERED = 1;

/**
 * Characteristic "Streaming Status"
 */

class StreamingStatus extends Characteristic {
	constructor() {
		super('Streaming Status', '00000120-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.StreamingStatus = StreamingStatus;
Characteristic.StreamingStatus.UUID = '00000120-0000-1000-8000-0026BB765291';

// The value property of StreamingStatus must be one of the following:

/**
 * Characteristic "Sulphur Dioxide Density"
 */

class SulphurDioxideDensity extends Characteristic {
	constructor() {
		super('Sulphur Dioxide Density', '000000C5-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1000,
			minValue: 0
		});
	}
}

Characteristic.SulphurDioxideDensity = SulphurDioxideDensity;
Characteristic.SulphurDioxideDensity.UUID = '000000C5-0000-1000-8000-0026BB765291';

// The value property of SulphurDioxideDensity must be one of the following:

/**
 * Characteristic "Supported Audio Stream Configuration"
 */

class SupportedAudioStreamConfiguration extends Characteristic {
	constructor() {
		super('Supported Audio Stream Configuration', '00000115-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.SupportedAudioStreamConfiguration = SupportedAudioStreamConfiguration;
Characteristic.SupportedAudioStreamConfiguration.UUID = '00000115-0000-1000-8000-0026BB765291';

// The value property of SupportedAudioStreamConfiguration must be one of the following:

/**
 * Characteristic "Supported RTP Configuration"
 */

class SupportedRTPConfiguration extends Characteristic {
	constructor() {
		super('Supported RTP Configuration', '00000116-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.SupportedRTPConfiguration = SupportedRTPConfiguration;
Characteristic.SupportedRTPConfiguration.UUID = '00000116-0000-1000-8000-0026BB765291';

// The value property of SupportedRTPConfiguration must be one of the following:

/**
 * Characteristic "Supported Video Stream Configuration"
 */

class SupportedVideoStreamConfiguration extends Characteristic {
	constructor() {
		super('Supported Video Stream Configuration', '00000114-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.TLV8,
			perms: [Characteristic.Perms.PAIRED_READ]
		});
	}
}

Characteristic.SupportedVideoStreamConfiguration = SupportedVideoStreamConfiguration;
Characteristic.SupportedVideoStreamConfiguration.UUID = '00000114-0000-1000-8000-0026BB765291';

// The value property of SupportedVideoStreamConfiguration must be one of the following:

/**
 * Characteristic "Swing Mode"
 */

class SwingMode extends Characteristic {
	constructor() {
		super('Swing Mode', '000000B6-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.SwingMode = SwingMode;
Characteristic.SwingMode.UUID = '000000B6-0000-1000-8000-0026BB765291';

// The value property of SwingMode must be one of the following:
Characteristic.SwingMode.DISABLED = 0;
Characteristic.SwingMode.ENABLED = 1;

/**
 * Characteristic "Target Air Purifier State"
 */

class TargetAirPurifierState extends Characteristic {
	constructor() {
		super('Target Air Purifier State', '000000A8-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.TargetAirPurifierState = TargetAirPurifierState;
Characteristic.TargetAirPurifierState.UUID = '000000A8-0000-1000-8000-0026BB765291';

// The value property of TargetAirPurifierState must be one of the following:
Characteristic.TargetAirPurifierState.MANUAL = 0;
Characteristic.TargetAirPurifierState.AUTO = 1;

/**
 * Characteristic "Target Door State"
 */

class TargetDoorState extends Characteristic {
	constructor() {
		super('Target Door State', '00000032-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.TargetDoorState = TargetDoorState;
Characteristic.TargetDoorState.UUID = '00000032-0000-1000-8000-0026BB765291';

// The value property of TargetDoorState must be one of the following:
Characteristic.TargetDoorState.OPEN = 0;
Characteristic.TargetDoorState.CLOSED = 1;

/**
 * Characteristic "Target Fan State"
 */

class TargetFanState extends Characteristic {
	constructor() {
		super('Target Fan State', '000000BF-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.TargetFanState = TargetFanState;
Characteristic.TargetFanState.UUID = '000000BF-0000-1000-8000-0026BB765291';

// The value property of TargetFanState must be one of the following:
Characteristic.TargetFanState.MANUAL = 0;
Characteristic.TargetFanState.AUTO = 1;

/**
 * Characteristic "Target Heating Cooling State"
 */

class TargetHeatingCoolingState extends Characteristic {
	constructor() {
		super('Target Heating Cooling State', '00000033-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 3,
			minValue: 0,
			minStep: 1
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
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.TargetHorizontalTiltAngle = TargetHorizontalTiltAngle;
Characteristic.TargetHorizontalTiltAngle.UUID = '0000007B-0000-1000-8000-0026BB765291';

// The value property of TargetHorizontalTiltAngle must be one of the following:

/**
 * Characteristic "Target Position"
 */

class TargetPosition extends Characteristic {
	constructor() {
		super('Target Position', '0000007C-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.TargetPosition = TargetPosition;
Characteristic.TargetPosition.UUID = '0000007C-0000-1000-8000-0026BB765291';

// The value property of TargetPosition must be one of the following:

/**
 * Characteristic "Target Relative Humidity"
 */

class TargetRelativeHumidity extends Characteristic {
	constructor() {
		super('Target Relative Humidity', '00000034-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.TargetRelativeHumidity = TargetRelativeHumidity;
Characteristic.TargetRelativeHumidity.UUID = '00000034-0000-1000-8000-0026BB765291';

// The value property of TargetRelativeHumidity must be one of the following:

/**
 * Characteristic "Target Temperature"
 */

class TargetTemperature extends Characteristic {
	constructor() {
		super('Target Temperature', '00000035-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.CELSIUS,
			maxValue: 38,
			minValue: 10,
			minStep: 0.1
		});
	}
}

Characteristic.TargetTemperature = TargetTemperature;
Characteristic.TargetTemperature.UUID = '00000035-0000-1000-8000-0026BB765291';

// The value property of TargetTemperature must be one of the following:

/**
 * Characteristic "Target Tilt Angle"
 */

class TargetTiltAngle extends Characteristic {
	constructor() {
		super('Target Tilt Angle', '000000C2-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.TargetTiltAngle = TargetTiltAngle;
Characteristic.TargetTiltAngle.UUID = '000000C2-0000-1000-8000-0026BB765291';

// The value property of TargetTiltAngle must be one of the following:

/**
 * Characteristic "Target Vertical Tilt Angle"
 */

class TargetVerticalTiltAngle extends Characteristic {
	constructor() {
		super('Target Vertical Tilt Angle', '0000007D-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.INT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.ARC_DEGREE,
			maxValue: 90,
			minValue: -90,
			minStep: 1
		});
	}
}

Characteristic.TargetVerticalTiltAngle = TargetVerticalTiltAngle;
Characteristic.TargetVerticalTiltAngle.UUID = '0000007D-0000-1000-8000-0026BB765291';

// The value property of TargetVerticalTiltAngle must be one of the following:

/**
 * Characteristic "Temperature Display Units"
 */

class TemperatureDisplayUnits extends Characteristic {
	constructor() {
		super('Temperature Display Units', '00000036-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			maxValue: 1,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.TemperatureDisplayUnits = TemperatureDisplayUnits;
Characteristic.TemperatureDisplayUnits.UUID = '00000036-0000-1000-8000-0026BB765291';

// The value property of TemperatureDisplayUnits must be one of the following:
Characteristic.TemperatureDisplayUnits.CELSIUS = 0;
Characteristic.TemperatureDisplayUnits.FAHRENHEIT = 1;

/**
 * Characteristic "Version"
 */

class Version extends Characteristic {
	constructor() {
		super('Version', '00000037-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.STRING,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS]
		});
	}
}

Characteristic.Version = Version;
Characteristic.Version.UUID = '00000037-0000-1000-8000-0026BB765291';

// The value property of Version must be one of the following:

/**
 * Characteristic "VOC Density"
 */

class VOCDensity extends Characteristic {
	constructor() {
		super('VOC Density', '000000C8-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.FLOAT,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.EVENTS],
			maxValue: 1000,
			minValue: 0
		});
	}
}

Characteristic.VOCDensity = VOCDensity;
Characteristic.VOCDensity.UUID = '000000C8-0000-1000-8000-0026BB765291';

// The value property of VOCDensity must be one of the following:

/**
 * Characteristic "Volume"
 */

class Volume extends Characteristic {
	constructor() {
		super('Volume', '00000119-0000-1000-8000-0026BB765291', {
			format: Characteristic.Formats.UINT8,
			perms: [Characteristic.Perms.PAIRED_READ, Characteristic.Perms.PAIRED_WRITE, Characteristic.Perms.EVENTS],
			unit: Characteristic.Units.PERCENTAGE,
			maxValue: 100,
			minValue: 0,
			minStep: 1
		});
	}
}

Characteristic.Volume = Volume;
Characteristic.Volume.UUID = '00000119-0000-1000-8000-0026BB765291';

// The value property of Volume must be one of the following:

