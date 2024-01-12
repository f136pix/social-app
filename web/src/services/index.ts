export function jsToPostgressArr(data) {
    const values = data.map(([k, v]) => `("${k}", ${v})`).join(",");
    return `${values}`;
}

export function getBase64(file, obj) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        obj.imageUrl = reader.result;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
        obj.imageUrl = 'Error' + error
    };
}

export function stringToArr(str: string): string[] {
    const temp: string[] = str.split(",");
    return temp
}

export function convertToGraphQLArray(arr : string[]) {
    const graphqlArray = arr.map(item => {
        return { value: item };
    });

    return graphqlArray;
}

export function wrapStringArr(string) {
    return(`{${string}}`)
}
