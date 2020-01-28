let mergedResponses = [];
function rpc(promise) {
  return promise.then(
    (value) => {
      if (value.status === 200) {
        value.json().then((data) => { 
          mergedResponses = mergedResponses.concat(data.args.a);  
        });
      }
      
      return { status: 'fulfilled', value, code: value.status };
    },
    (error) => {
      return { status: 'rejected', error };
    }
  );
}

const promises = [
  fetch('https://httpstat.us/408'),
  fetch('https://httpbin.org/anything?a=1&a=19&a=3&a=56'),
  fetch('https://httpbin.org/anything?a=5&a=8&a=3&a=123'),
  fetch('https://httpstat.us/403')
];

const results = await Promise.all(promises.map(rpc));

console.log(mergedResponses);
