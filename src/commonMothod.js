import axios from "axios";

const commonMothods = {
    data() {
        return { webApiRoot: process.env.VUE_APP_WEB_API_ROOT };
    },

    callAPI(url, method, data, onSucc, onFail) {
        url = `${process.env.VUE_APP_WEB_API_ROOT}${url}`;
        const strData = data === null ? null : `=${JSON.stringify(data)}`;
        const prom =
            method == "get"
                ? axios.get(url, strData)
                : method == "post"
                    ? axios.post(url, strData)
                    : null;
        if (prom !== null) {
            prom
                .then((response) => {
                    if (response.status == 200) {
                        if (onSucc !== null) {
                            onSucc(response.data);
                        }
                    } else {
                        console.log(
                            `Calling API Failed. Status Code: ${response.status}.`
                        );
                        if (onFail !== undefined && onFail !== null) {
                            onFail(response)
                        }
                    }
                })
                .catch((error) => {
                    console.log(`Calling API Failed: ${error.message}`);
                    if (onFail !== undefined && onFail !== null) {
                        onFail(error)
                    }
                });
        }
    },
    SelectItems(ele) {

    },

};

export default commonMothods;