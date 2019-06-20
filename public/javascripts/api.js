class Api {
  constructor(data) {
    this.id = data.id;
    this.url = data.url;
    this.name = data.name;
    this.apikey = data.apikey;
    this.description = data.description;
    this.limitNum = data.limitNum;
    this.skip = data.skip;

  };
  init() {
    let that = this;

  };
  save_api(fn) {
    let that = this;
    let ajax_url = '/api_save';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      apikey: that.apikey,
      description: that.description
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  update_api(fn) {
    let that = this;
    let ajax_url = '/api_updata';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      apikey: that.apikey,
      description: that.description
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  delete_api(fn) {
    let that = this;
    let ajax_url = '/api_remove';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      apikey: that.apikey,
      description: that.description
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  select_api(fn) {
    let that = this;
    let ajax_url = '/api_select';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      apikey: that.apikey,
      description: that.description,
      limitNum: that.limitNum,
      skip: that.skip
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  ajaxPost(ajax_url, ajax_data, fn) {
    let that = this;
    $.ajax({
      url: ajax_url,
      data: ajax_data,
      type: 'POST',
      async: true,
      success: (data) => {
        if (fn) {
          fn(data);
        }
      }
    });
  };

}
