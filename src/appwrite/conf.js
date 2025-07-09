// conf.js
import config from '../config/config.js';
import { Client, Databases, Storage, Query, ID } from 'appwrite';

export class Service {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredimage, status, userid }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        { title, content, featuredimage, status, userid }
      );
    } catch (error) {
      console.error('Appwrite service :: createPost :: error', error);
      throw error;
    }
  }

  async updatePost(id, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
        { title, content, featuredimage, status }
      );
    } catch (error) {
      console.error('Appwrite service :: updatePost :: error', error);
      throw error;
    }
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.error('Appwrite service :: deletePost :: error', error);
      throw error;
    }
  }

  async getPost(id) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.error('Appwrite service :: getPost :: error', error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error('Appwrite service :: getPosts :: error', error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Appwrite service :: uploadFile :: error', error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error('Appwrite service :: deleteFile :: error', error);
      throw error;
    }
  }

  getFilePreview(fileId) {
  return this.bucket.getFileDownload(
    config.appwriteBucketId,
    fileId
  ).toString();
}

}

 

const service = new Service();
export default service;
