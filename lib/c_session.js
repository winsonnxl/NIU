/**
 * Created by winson on 10/14/15.
 * 操作session
 */

exports.get_Session=function(req){
    //console.log(('get_Session======>')+req.session.uid);
    var data={'uid':req.session.uid,
        'rname':req.session.rname,
        'mobile':req.session.mobile,
        'local':req.session.local,
        'dep':req.session.dev,
        'level':req.session.level};
    return data;
};

