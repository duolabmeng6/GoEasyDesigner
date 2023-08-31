const parseDimension = (value) => {
    if (typeof value === 'string') {
        return value.includes('%') ? value : `${parseInt(value)}px`;
    }
    return `${parseInt(value)}px`;
};

const getItemStyle = (item) => {
    const style = {
        top: parseDimension(item.top),
        left: parseDimension(item.left),
        width: parseDimension(item.width),
        height: parseDimension(item.height),
        border: item.border,
        zIndex: item.层级
    };

    return style;
};


export {getItemStyle};