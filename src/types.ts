export type PhotoMetadata = {
  alt?: string;
  caption?: string;
};

export type CloudinaryPhoto = {
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
  context?: { custom?: PhotoMetadata };
};

export type Photo = {
  alt?: string;
  created_at: string;
  height: number;
  id: string;
  title?: string;
  width: number;
};
