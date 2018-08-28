
export interface AppData {
  masterSnapshotId: string;
  snapshots: SnapshotData[];
}

export interface SnapshotData {
  id: string;
  desc: string;
  commitUrl: string;
  timestamp: number;
  screenshots: ScreenshotData[];
}

export interface ScreenshotData {
  id: string;
  desc: string;
  image: string;
}