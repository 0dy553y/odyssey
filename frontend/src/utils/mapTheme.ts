import { MapLand } from 'types/challenges';

export function getLandPath(land: MapLand): string {
  switch (land) {
    case MapLand.GRASS:
      return 'land/grass.vox';
    default:
      return 'land/grass.vox';
  }
}
