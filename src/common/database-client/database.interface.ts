export interface DatabaseInterface {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
