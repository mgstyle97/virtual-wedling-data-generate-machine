export default class WeldingData {
  constructor(
    private readonly machineName: string,
    private readonly itemNo: string,
    private readonly workingTime: Date,
    private readonly thicknessOne: number,
    private readonly thicknessTwo: number,
    private readonly weldForce: number,
    private readonly weldCurrent: number,
    private readonly weldVoltage: number,
    private readonly weldTime: number,
    private readonly scaledWeldForce: string,
    private readonly scaledWeldCurrent: string,
    private readonly scaledWeldVoltage: string,
    private readonly scaledWeldTime: string,
  ) {}
}
