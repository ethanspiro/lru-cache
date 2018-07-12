const Cache = require('./lib/lru_cache.js');

const addressCache = new Cache();

function fast_rate_lookup(salesTaxLookupFunction) {
    return function(...args) {
        if (addressCache.exists(args)) {
            console.log(`Performing a fast tax lookup on element ${args}`); // testing purposes
            return addressCache.retrieve(args);
        }
        
        console.log(`Performing a slow tax lookup on element ${args}`); // testing purposes
        const salesTax = salesTaxLookupFunction.apply(this, args);
        addressCache.add(args, salesTax);
        
        return salesTax;
    }
}

// assuming address has already been converted to something like : address:123elmst:seattle:wa:usa:98110
function sales_tax_lookup(address) {
    return null;
}

// memoize sales tax lookup with lru cache
sales_tax_lookup = fast_rate_lookup(sales_tax_lookup);

module.exports = sales_tax_lookup;
