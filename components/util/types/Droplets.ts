import type { Meta } from "./General";

interface Droplet {
  id: number;
  name: string;
  memory: number;
  vcpus: number;
  disk: number;
  locked: boolean;
  status: "new" | "active" | "off" | "archive";
  created_at: Date;
  features: string[];
  backup_ids: number[];
  next_backup_window: object | null;
  snapshot_ids: number[];
  image: object;
  volume_ids: string[];
  size: object;
  size_slug: string;
  networks: object;
  region: object;
  tags: string[];
  vpc_uuid: string;
}

interface DropletList {
  droplets: Droplet[];
  links: object;
  meta: Meta;
}

export { DropletList, Droplet };
