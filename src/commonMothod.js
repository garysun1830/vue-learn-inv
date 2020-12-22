import axios from "axios";

const commonMothods = {
    data() {
        return{ webApiRoot : process.env.VUE_APP_WEB_API_ROOT};
    },

    callAPI(url, method, data, onSucc, onFail) {
        url = `${process.env.VUE_APP_WEB_API_ROOT}${url}`;
        const prom =
            method == "get"
                ? axios.get(url, { data: data })
                : method == "post"
                    ? axios.post(url, { data: data })
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

};

export default commonMothods;