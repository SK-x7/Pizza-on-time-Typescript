export function formatCurrency(val1:number,val2:number=0):string|null {
  // if(!value) value=0;  
  const value=val1-val2;
  console.log(value);
  if(!value) return "";
     return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  }
  
  export function formatDate(dateStr:Date) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  }
  
  export function calcMinutesLeft(dateStr:Date) {
    const d1 = new Date().getTime();
    const d2 = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
  }
  
  export function getEstimatedDeliveryTime(min:number, max:number) {
    const now = new Date();
    console.log(now.getTime().toLocaleString);
    // Generate a random number of minutes between min and max
    const ISTOffset = 330; // IST is UTC + 5:30
  const offsetInMilliseconds = ISTOffset * 60 * 1000;
    const randomMinutes = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Create a new date object representing the estimated delivery time
    const estimatedDeliveryTime = new Date(now.getTime() + randomMinutes * 60000+offsetInMilliseconds);
  
    return estimatedDeliveryTime;
  }
  
  // Example usage for a random delivery time between 30 and 60 minutes
  
  
  