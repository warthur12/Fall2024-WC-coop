### Storing Images and Files in Keystone: A Comprehensive Guide

Keystone supports managing assets like images and files with its field types: `image` and `file`. This guide will walk through how to configure your Keystone instance to store and serve these assets either locally or via Amazon S3 (or S3-compatible services like DigitalOcean Spaces).

#### Key Concepts of Asset Storage in Keystone

Keystone manages file and image assets through a storage object that you define in the configuration. Here's how Keystone manages storage:

- **Storage Type**: You can define either `s3` or `local` storage types.
- **Field Type**: Keystone distinguishes between `file` (for storing general files) and `image` (specifically for images).
- **URL Generation**: A customizable function (`generateUrl`) defines the URLs that assets will use, whether they are stored locally or remotely.
- **Physical Storage**: Keystone stores assets either in a local path (for local storage) or in a defined S3 bucket (for cloud storage).
- **Serving Assets**: Keystone either serves assets through a `serverRoute` for local files or via proxied connections for S3.

### Defining Storage in Keystone's Configuration

Before setting up storage, environment variables need to be mapped for easy access, using `dotenv` to load values from a `.env` file.

```javascript
import { config } from '@keystone-6/core';
import dotenv from 'dotenv';
import { lists } from './schema';

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  S3_REGION: region = 'ap-southeast-2',
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
} = process.env;
```

### Storing Assets on Amazon S3

You can store files in an S3 bucket by adding a storage object to the Keystone config. In the following example, the storage object is named `my_s3_files`:

```javascript
storage: {
  my_s3_files: {
    kind: 's3', // Specify S3 storage
    type: 'file', // This store is for general files
    bucketName, // S3 bucket name from the environment
    region, // S3 region from the environment
    accessKeyId, // Access key from environment
    secretAccessKey, // Secret key from environment
    signed: { expiry: 3600 }, // Optional: Signed URLs with a 1-hour expiry
  },
  // Add additional storage objects if necessary
}
```

#### S3-Compatible Storage (e.g., DigitalOcean Spaces)

If you're using an S3-compatible provider like DigitalOcean Spaces, you'll need to provide an endpoint URL as part of your storage configuration:

```javascript
storage: {
  my_s3_files: {
    kind: 's3',
    type: 'file',
    bucketName,
    region,
    accessKeyId,
    secretAccessKey,
    signed: { expiry: 3600 },
    endpoint: 'https://your-endpoint-url', // Endpoint for S3-compatible storage
  },
}
```

### Storing Assets Locally

You can also store images or files locally. Below is an example of local image storage under the path `/public/images`, served via a route `/images`:

```javascript
storage: {
  my_local_images: {
    kind: 'local', // Specify local storage
    type: 'image', // This store is for images
    generateUrl: path => `${baseUrl}/images${path}`, // URL returned by Keystone in the API
    serverRoute: { path: '/images' }, // The route to serve images
    storagePath: 'public/images', // Local storage directory
  }
}
```

### Customizing the URL Returned in GraphQL

Keystone's `image` and `file` fields return several properties, including the `url` field. This URL can be customized by modifying the `generateUrl` function in the storage object:

```javascript
generateUrl: path => `${baseUrl}/images${path}`,
```

### Complete Example: S3 and Local Storage in Keystone

Here's a full example of how you might configure both S3 and local storage in the same Keystone setup:

```javascript
import { config } from '@keystone-6/core';
import dotenv from 'dotenv';
import { lists } from './schema';

dotenv.config();

const {
  S3_BUCKET_NAME: bucketName = 'keystone-test',
  S3_REGION: region = 'ap-southeast-2',
  S3_ACCESS_KEY_ID: accessKeyId = 'keystone',
  S3_SECRET_ACCESS_KEY: secretAccessKey = 'keystone',
  ASSET_BASE_URL: baseUrl = 'http://localhost:3000',
} = process.env;

export default config({
  db: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL || 'file:./keystone-example.db',
  },
  lists,
  storage: {
    my_local_images: {
      kind: 'local',
      type: 'image',
      generateUrl: path => `${baseUrl}/images${path}`,
      serverRoute: { path: '/images' },
      storagePath: 'public/images',
    },
    my_s3_files: {
      kind: 's3',
      type: 'file',
      bucketName,
      region,
      accessKeyId,
      secretAccessKey,
      signed: { expiry: 5000 }, // Expire links after 5000 seconds
    },
  },
});
```

### Using Images and Files in Lists

Once the storage configuration is in place, you can define the `image` and `file` fields in your schema by referencing the storage configuration:

```javascript
lists: {
  User: list({
    fields: {
      avatar: image({ storage: 'my_local_images' }), // Local image storage
      document: file({ storage: 'my_s3_files' }), // S3 file storage
    }
  })
}
```

### Advanced Use Case: Reusable Image/Files with Relationships

If you need reusable images or files that can be shared across multiple lists or in complex field types like `Document`, you can set up a "Gallery" list and use relationships to reference the assets:

```javascript
import { list } from '@keystone-6/core';
import { text, image, relationship } from '@keystone-6/core/fields';

export const lists = {
  Image: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      altText: text(),
      image: image({ storage: 'my_local_images' }),
    }
  }),
  Page: list({
    fields: {
      name: text(),
      content: text(),
      images: relationship({ ref: 'Image', many: true }),
    }
  })
};
```

### Content-Type for Images and Files

- **Images**: Keystone sets the `Content-Type` based on the file extension (e.g., `image/png`).
- **Files**: For files, Keystone uses the default `application/octetstream` content type, meaning the file extension can’t be fully trusted.