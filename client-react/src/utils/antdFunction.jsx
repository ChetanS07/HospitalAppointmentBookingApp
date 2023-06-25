import React from 'react';

export const success = (api, msg) => {
    api.open({
        type: "success",
        content: msg
    });
};

export const error = (msg) => {
    api.open({
        type: "error",
        content: msg
    });
};

export const warning = (msg) => {
    api.open({
        type: "warning",
        content: msg
    });
};
