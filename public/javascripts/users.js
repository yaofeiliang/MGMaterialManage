class Users {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.type = data.type;

    };
    init() {
        let that = this;

    };
    save_users(fn) {
        let that = this;
        let ajax_url = '/users_save';
        let ajax_data = {
            id: that.id,
            username: that.username,
            password: that.password,
            type: that.type,
        };
        that.ajaxPost(ajax_url, ajax_data, fn);
    };
    update_users(fn) {
        let that = this;
        let ajax_url = '/users_updata';
        let ajax_data = {
            id: that.id,
            username: that.username,
            password: that.password,
            type: that.type,
        };
        that.ajaxPost(ajax_url, ajax_data, fn);
    };
    delete_users(fn) {
        let that = this;
        let ajax_url = '/users_remove';
        let ajax_data = {
            id: that.id,
            username: that.username,
            password: that.password,
            type: that.type,
        };
        that.ajaxPost(ajax_url, ajax_data, fn);
    };
    select_users(fn) {
        let that = this;
        let ajax_url = '/users_select';
        let ajax_data = {
            id: that.id,
            username: that.username,
            password: that.password,
            type: that.type,
            skip: that.skip,
            limitNum: that.limitNum
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
