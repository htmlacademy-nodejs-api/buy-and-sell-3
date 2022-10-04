export interface DocumentExistsInterface {
  exists(documentId: string): Promise<boolean>;
}
