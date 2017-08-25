import React from 'react'
import moment from 'moment'

const MobileView = ({articleInfo}) => (
    <div className="article-detail__mobile">
        <div className="article-detail__bg">
            <img src={require("../../assets/images/iPhone6.png")} alt="" />
        </div>
        <div className="article-detail__content">
            <div className="article-detail__heading">
                <p className="detail-heading__title">{articleInfo.title || '解税宝'}</p>
                <p className="detail-heading__time">{moment(articleInfo.createDate).format('YYYY-MM-DD HH:mm:ss')}</p>
                <p className="detail-heading__label">#{articleInfo.label || '知识归结'}#</p>
                <div style={{ clear: 'both' }}></div>
            </div>
            { articleInfo.content ?  
                <div className="article-detail__body" 
                dangerouslySetInnerHTML={{__html:articleInfo.content}}/>:
            <div className="article-detail__body">精彩内容稍后奉上......</div>}
        </div>
    </div>
)

export default MobileView