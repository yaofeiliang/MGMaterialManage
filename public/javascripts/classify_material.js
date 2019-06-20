class Classify_material {
  constructor(data) {
    this.id = data.id;
    this.url = data.url;
    this.name = data.name;
    this.fid = data.fid;
    this.fname = data.fname;
    this.description = data.description;
    this.limitNum = data.limitNum;
    this.skip = data.skip;

  };
  init() {
    let that = this;

  };
  save_classify_material(fn) {
    let that = this;
    let ajax_url = '/classify_material_save';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      fid: that.fid,
      description: that.description
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  update_classify_material(fn) {
    let that = this;
    let ajax_url = '/classify_material_updata';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      fid: that.fid,
      description: that.description
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  delete_classify_material(fn) {
    let that = this;
    let ajax_url = '/classify_material_remove';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      fid: that.fid,
      description: that.description
    };
    that.ajaxPost(ajax_url, ajax_data, fn);
  };
  select_classify_material(fn) {
    let that = this;
    let ajax_url = '/classify_material_select';
    let ajax_data = {
      id: that.id,
      url: that.url,
      name: that.name,
      fid: that.fid,
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
