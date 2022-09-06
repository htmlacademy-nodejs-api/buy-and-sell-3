export interface FileReaderInterface {
  readonly filename: string;
  read(): void;
}
