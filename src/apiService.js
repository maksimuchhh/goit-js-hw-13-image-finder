export default {
  searchQuery: '',
  pageNumber: 1,
  DOMEN: 'https://pixabay.com/api/',
  API_KEY: '19216431-b460da2edf9faaa62085afedc',
  async fetchPhoto(URL) {
    const resolve = await fetch(URL);
    return resolve.json();
  },
  setSearchQuery(q) {
    return (this.searchQuery = q);
  },
  addPageNumber() {
    return (this.pageNumber += 1);
  },
  resetPageNumber() {
    return (this.pageNumber = 1);
  },
  generateURL() {
    return (URL = `${this.DOMEN}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${this.API_KEY}`);
  },
};
