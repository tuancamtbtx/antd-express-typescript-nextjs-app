import { observable, action } from "mobx";

const autoInjectData = (context, initialData) => {
  if (initialData && typeof initialData === "object") {
    Object.keys(initialData).forEach((key) => {
      if (initialData[key]) {
        context[key] = initialData[key];
      }
    });
  }
};
class Store {
  constructor(isServer, initialData) {
    autoInjectData(this, initialData);
  }
  api = null;
  @observable isFetching = true;
  @observable data = [];
  @observable pagination = {
    page: 0,
    itemPerPage: 10,
  };

  @observable filters = {};
  @action
  setFilter({ key, value }) {
    this.filters[key] = value;
  }

  @action
  setPagination({ page }) {
    this.pagination.page = page;
  }

  @action
  resetPagination() {
    this.pagination.page = 0;
  }

  @action
  async fetchAll() {
    this.isFetching = true;
    try {
      const { success, data } = await this.api.getAll({
        ...this.filters,
        ...this.pagination,
      });
      if (success) {
        this.data = data;
        this.isFetching = false;
        return true;
      }
      this.isFetching = false;
      return false;
    } catch (e) {
      this.isFetching = false;
      return false;
    }
  }
}
export default Store;
