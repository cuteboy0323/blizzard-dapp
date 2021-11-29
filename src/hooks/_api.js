import Axios from "./_axios";
// ** Declare Auth API
export const getCurrentPrice = async (coinId, vsCurrency) => {
    const response = await Axios({
        endpoint: `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`,
        method: "GET",
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw response;
    }
};

export const getCurrentMarket = async (ids, vsCurrency) => {
    const response = await Axios({
        endpoint: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        method: "GET",
    });
    if (response.status === 200) {
        return response.data;
    } else {
        throw response;
    }
};