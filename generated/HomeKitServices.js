// THIS FILE IS AUTO-GENERATED - DO NOT MODIFY

const Service = require('../src/Service');
const Characteristic = require('../src/Characteristic');

/**
 * Service "AccessoryInformation"
 */

class AccessoryInformation extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000003E-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Identify);
		this.addCharacteristic(Characteristic.Manufacturer);
		this.addCharacteristic(Characteristic.Model);
		this.addCharacteristic(Characteristic.Name);
		this.addCharacteristic(Characteristic.SerialNumber);
		this.addCharacteristic(Characteristic.FirmwareRevision);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.HardwareRevision);
		this.addOptionalCharacteristic(Characteristic.AccessoryFlags);
	}
}

Service.AccessoryInformation = AccessoryInformation;
Service.AccessoryInformation.UUID = '0000003E-0000-1000-8000-0026BB765291';
/**
 * Service "AirPurifier"
 */

class AirPurifier extends Service {
	constructor(displayName, subType) {
		super(displayName, '000000BB-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Active);
		this.addCharacteristic(Characteristic.CurrentAirPurifierState);
		this.addCharacteristic(Characteristic.TargetAirPurifierState);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.RotationSpeed);
		this.addOptionalCharacteristic(Characteristic.SwingMode);
		this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
	}
}

Service.AirPurifier = AirPurifier;
Service.AirPurifier.UUID = '000000BB-0000-1000-8000-0026BB765291';
/**
 * Service "AirQualitySensor"
 */

class AirQualitySensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008D-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.AirQuality);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.TargetTiltAngle);
		this.addOptionalCharacteristic(Characteristic.NitrogenDioxideDensity);
		this.addOptionalCharacteristic(Characteristic.SulphurDioxideDensity);
		this.addOptionalCharacteristic(Characteristic.PM2_5_Density);
		this.addOptionalCharacteristic(Characteristic.PM10_Density);
		this.addOptionalCharacteristic(Characteristic.VOCDensity);
		this.addOptionalCharacteristic(Characteristic.StatusActive);
		this.addOptionalCharacteristic(Characteristic.StatusFault);
		this.addOptionalCharacteristic(Characteristic.StatusTampered);
		this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
	}
}

Service.AirQualitySensor = AirQualitySensor;
Service.AirQualitySensor.UUID = '0000008D-0000-1000-8000-0026BB765291';
/**
 * Service "BatteryService"
 */

class BatteryService extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000096-0000-1000-8000-0026BB765291', subType);

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
 * Service "CameraRTPStreamManagement"
 */

class CameraRTPStreamManagement extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000110-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.StreamingStatus);
		this.addCharacteristic(Characteristic.SupportedVideoStreamConfiguration);
		this.addCharacteristic(Characteristic.SupportedAudioStreamConfiguration);
		this.addCharacteristic(Characteristic.SupportedRTPConfiguration);
		this.addCharacteristic(Characteristic.SetupEndpoints);
		this.addCharacteristic(Characteristic.SelectedRTPStreamConfiguration);

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

Service.CameraRTPStreamManagement = CameraRTPStreamManagement;
Service.CameraRTPStreamManagement.UUID = '00000110-0000-1000-8000-0026BB765291';
/**
 * Service "CarbonDioxideSensor"
 */

class CarbonDioxideSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000097-0000-1000-8000-0026BB765291', subType);

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
 * Service "CarbonMonoxideSensor"
 */

class CarbonMonoxideSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000007F-0000-1000-8000-0026BB765291', subType);

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
 * Service "ContactSensor"
 */

class ContactSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000080-0000-1000-8000-0026BB765291', subType);

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
		super(displayName, '00000081-0000-1000-8000-0026BB765291', subType);

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
 * Service "Doorbell"
 */

class Doorbell extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000121-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.Volume);
		this.addOptionalCharacteristic(Characteristic.Brightness);
	}
}

Service.Doorbell = Doorbell;
Service.Doorbell.UUID = '00000121-0000-1000-8000-0026BB765291';
/**
 * Service "Fan"
 */

class Fan extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000040-0000-1000-8000-0026BB765291', subType);

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
 * Service "Fan_v2"
 */

class Fan_v2 extends Service {
	constructor(displayName, subType) {
		super(displayName, '000000B7-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Active);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.CurrentFanState);
		this.addOptionalCharacteristic(Characteristic.TargetFanState);
		this.addOptionalCharacteristic(Characteristic.RotationDirection);
		this.addOptionalCharacteristic(Characteristic.RotationSpeed);
		this.addOptionalCharacteristic(Characteristic.SwingMode);
		this.addOptionalCharacteristic(Characteristic.LockPhysicalControls);
	}
}

Service.Fan_v2 = Fan_v2;
Service.Fan_v2.UUID = '000000B7-0000-1000-8000-0026BB765291';
/**
 * Service "FilterMaintenance"
 */

class FilterMaintenance extends Service {
	constructor(displayName, subType) {
		super(displayName, '000000BA-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.FilterChangeIndication);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.FilterLifeLevel);
		this.addOptionalCharacteristic(Characteristic.ResetFilterIndication);
	}
}

Service.FilterMaintenance = FilterMaintenance;
Service.FilterMaintenance.UUID = '000000BA-0000-1000-8000-0026BB765291';
/**
 * Service "GarageDoorOpener"
 */

class GarageDoorOpener extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000041-0000-1000-8000-0026BB765291', subType);

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
 * Service "HumiditySensor"
 */

class HumiditySensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000082-0000-1000-8000-0026BB765291', subType);

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
 * Service "LeakSensor"
 */

class LeakSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000083-0000-1000-8000-0026BB765291', subType);

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
 * Service "Lightbulb"
 */

class Lightbulb extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000043-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Brightness);
		this.addOptionalCharacteristic(Characteristic.Hue);
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.Saturation);
		this.addOptionalCharacteristic(Characteristic.ColorTemperature);
	}
}

Service.Lightbulb = Lightbulb;
Service.Lightbulb.UUID = '00000043-0000-1000-8000-0026BB765291';
/**
 * Service "LightSensor"
 */

class LightSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000084-0000-1000-8000-0026BB765291', subType);

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
 * Service "LockManagement"
 */

class LockManagement extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000044-0000-1000-8000-0026BB765291', subType);

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
	}
}

Service.LockManagement = LockManagement;
Service.LockManagement.UUID = '00000044-0000-1000-8000-0026BB765291';
/**
 * Service "LockMechanism"
 */

class LockMechanism extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000045-0000-1000-8000-0026BB765291', subType);

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
 * Service "Microphone"
 */

class Microphone extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000112-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Volume);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.Volume);
	}
}

Service.Microphone = Microphone;
Service.Microphone.UUID = '00000112-0000-1000-8000-0026BB765291';
/**
 * Service "MotionSensor"
 */

class MotionSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000085-0000-1000-8000-0026BB765291', subType);

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
 * Service "OccupancySensor"
 */

class OccupancySensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000086-0000-1000-8000-0026BB765291', subType);

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
		super(displayName, '00000047-0000-1000-8000-0026BB765291', subType);

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
 * Service "SecuritySystem"
 */

class SecuritySystem extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000007E-0000-1000-8000-0026BB765291', subType);

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
 * Service "ServiceLabel"
 */

class ServiceLabel extends Service {
	constructor(displayName, subType) {
		super(displayName, '000000CC-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ServiceLabelNamespace);

  // Optional Characteristics
	}
}

Service.ServiceLabel = ServiceLabel;
Service.ServiceLabel.UUID = '000000CC-0000-1000-8000-0026BB765291';
/**
 * Service "Slat"
 */

class Slat extends Service {
	constructor(displayName, subType) {
		super(displayName, '000000B9-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.CurrentSlatState);
		this.addCharacteristic(Characteristic.SlatType);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.SwingMode);
		this.addOptionalCharacteristic(Characteristic.CurrentTiltAngle);
		this.addOptionalCharacteristic(Characteristic.TargetTiltAngle);
	}
}

Service.Slat = Slat;
Service.Slat.UUID = '000000B9-0000-1000-8000-0026BB765291';
/**
 * Service "SmokeSensor"
 */

class SmokeSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000087-0000-1000-8000-0026BB765291', subType);

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
 * Service "Speaker"
 */

class Speaker extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000113-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.Volume);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.Volume);
	}
}

Service.Speaker = Speaker;
Service.Speaker.UUID = '00000113-0000-1000-8000-0026BB765291';
/**
 * Service "StatelessProgrammableSwitch"
 */

class StatelessProgrammableSwitch extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000089-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.ProgrammableSwitchEvent);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
		this.addOptionalCharacteristic(Characteristic.ServiceLabelIndex);
	}
}

Service.StatelessProgrammableSwitch = StatelessProgrammableSwitch;
Service.StatelessProgrammableSwitch.UUID = '00000089-0000-1000-8000-0026BB765291';
/**
 * Service "Switch"
 */

class Switch extends Service {
	constructor(displayName, subType) {
		super(displayName, '00000049-0000-1000-8000-0026BB765291', subType);

		// Required Characteristics
		this.addCharacteristic(Characteristic.On);

  // Optional Characteristics
		this.addOptionalCharacteristic(Characteristic.Name);
	}
}

Service.Switch = Switch;
Service.Switch.UUID = '00000049-0000-1000-8000-0026BB765291';
/**
 * Service "TemperatureSensor"
 */

class TemperatureSensor extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008A-0000-1000-8000-0026BB765291', subType);

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
		super(displayName, '0000004A-0000-1000-8000-0026BB765291', subType);

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
 * Service "Window"
 */

class Window extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008B-0000-1000-8000-0026BB765291', subType);

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
 * Service "WindowCovering"
 */

class WindowCovering extends Service {
	constructor(displayName, subType) {
		super(displayName, '0000008C-0000-1000-8000-0026BB765291', subType);

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
