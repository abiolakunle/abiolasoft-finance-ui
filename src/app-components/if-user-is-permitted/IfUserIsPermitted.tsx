import React, { Fragment } from "react";
import { getUserInfo } from "utils/auth";

const IfUserIsPermitted = (props: { to: string; children: any }) => {
    const user = getUserInfo("Organization");

    return user.permissions.includes(props.to) ? <Fragment>{props.children}</Fragment> : <></>;
};

export default IfUserIsPermitted;
