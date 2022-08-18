# BunnyAction

This action deploys the specified directory to BunnyCDN.

## Upload and purge Pull Zone

```
- name: Deploy to BunnyCDN
  uses: Bearologics/BunnyAction@main
  with:
    source: "dist"
    storageZoneName: "myzone"
    accessKey: "${{ secrets.BUNNY_CDN_STORAGE_KEY }}"
    zoneId: "${{ secrets.BUNNY_CDN_PULL_ZONE_ID }}"
    zoneKey: "${{ secrets.BUNNY_CDN_ZONE_KEY }}"
    dangerouslyDeleteAllExistingData: true
```

## Upload only

```
- name: Upload to BunnyCDN
  uses: Bearologics/BunnyAction@main
  with:
    source: "dist"
    storageZoneName: "myzone"
    accessKey: "${{ secrets.BUNNY_CDN_STORAGE_KEY }}"
```

## Purge Pull Zone

```
- name: Purge BunnyCDN
  uses: Bearologics/BunnyAction@main
  with:
    zoneId: "${{ secrets.BUNNY_CDN_PULL_ZONE_ID }}"
    zoneKey: "${{ secrets.BUNNY_CDN_ZONE_KEY }}"
```
