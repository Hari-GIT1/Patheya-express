class BaseService {

    constructor(model) {
  
      this.model = model;
  
    }
  
    // ==========================
    // CREATE
    // ==========================
  
    async create(data) {
  
      return await this.model
        .create(data);
  
    }
  
    // ==========================
    // FIND BY ID
    // ==========================
  
    async findById(id) {
  
      return await this.model
        .findById(id);
  
    }
  
    // ==========================
    // FIND ONE
    // ==========================
  
    async findOne(filters) {
  
      return await this.model
        .findOne(filters);
  
    }
  
    // ==========================
    // FIND ALL
    // ==========================
  
    async find(filters = {}) {
  
      return await this.model
        .find(filters);
  
    }
  
    // ==========================
    // UPDATE
    // ==========================
  
    async updateById(
  
      id,
  
      data
  
    ) {
  
      return await this.model
        .findByIdAndUpdate(
  
          id,
  
          data,
  
          {
  
            new: true,
  
            runValidators: true
  
          }
  
        );
  
    }
  
    // ==========================
    // DELETE
    // ==========================
  
    async deleteById(id) {
  
      return await this.model
        .findByIdAndDelete(id);
  
    }
  
    // ==========================
    // COUNT
    // ==========================
  
    async count(filters = {}) {
  
      return await this.model
        .countDocuments(filters);
  
    }
  
  }
  
  module.exports =
    BaseService;