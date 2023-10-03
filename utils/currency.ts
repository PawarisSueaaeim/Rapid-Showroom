export const currency = (value: any, n?: number, options?: { isMathRound?: boolean }): string => {
    const _n = n || n === 0 ? n : 2;
    const _x = 3;
    if (value || value === 0) {
      const calVal = value instanceof Number ? value : +value;
      const re = "\\d(?=(\\d{" + _x + "})+" + (_n > 0 ? "\\." : "$") + ")";
  
      if (options && options.isMathRound) {
        return calVal.toFixed(n).replace(new RegExp(re, "g"), "$&,");
      } else {
        return calVal.toFixed(Math.max(0, ~~_n)).replace(new RegExp(re, "g"), "$&,");
      }
    } else {
      return "0.00";
    }
  };
  