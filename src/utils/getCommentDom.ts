function getCommentDom(obj: any, reply: boolean, str: string) {
    obj.user.avatar = obj.user.avatar ? obj.user.avatar : "http://img1.cache.netease.com/t/img/default80.png";
    if (!reply) {
        str += `<div class="commentItem" >
                    <div class="user">
                        <div class="avatarWrap">
                            <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                            <p class="name">
                                ${obj.user.nickname ? obj.user.nickname : "***"}
                                <span class="sText fr gray" >${obj.vote}<i class="icon zan_icon"></i></span>
                            </p>
                            <p class="other sText">
                                <span>${obj.user.location}</span>
                                <span>${obj.deviceInfo.deviceName}</span>
                                <span>${obj.createTime.slice(0, -3)}</span>
                            </p>
                        </div>
                    </div>
                    <p class="content">${obj.content}</p>
                </div>`
    } else if (obj.otherComment != undefined && reply) {
        let otherCommentStr: string = getCommentDom(obj.otherComment, true, str);
        str += `<div class="commentItem" >
                    <div class="user">
                        <div class="avatarWrap">
                            <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                            <p class="name">${obj.user.nickname ? obj.user.nickname : "***"}
                                <span class="sText fr gray" >${obj.vote}<i class="icon zan_icon"></i></span>
                            </p>
                            <p class="other sText">
                                <span>${obj.user.location}</span>
                                <span>${obj.deviceInfo.deviceName}</span>
                                <span>${obj.createTime.slice(0, -3)}</span>
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        <p>${obj.content}</p>
                        <div class="box" >${otherCommentStr}</div>
                    </div>
                </div>`
    } else if (obj.otherComment == undefined && reply) {
        str += `<div class="commentItem" >
                    <div class="user">
                        <div class="avatarWrap">
                            <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                            <div class="name">
                                ${obj.user.nickname ? obj.user.nickname : "***"}
                                <span class="sText fr gray" >${obj.vote}<i class="icon zan_icon"></i></span>
                            </div>
                            <div class="other sText">
                                <span>${obj.user.location}</span>
                                <span>${obj.deviceInfo.deviceName}</span>
                                <span>${obj.createTime.slice(0, -3)}</span>
                            </div>
                        </div>
                    </div>
                    <p class="content">${obj.content}</p>
                </div>`
    }
    return str
}
export default getCommentDom
