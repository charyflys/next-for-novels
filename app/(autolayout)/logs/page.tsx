'use client'
import { Avatar, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Paper, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getStoryList, getStoryTags, getTagInnerList, deleteStoryByName } from "@/request/logs"
export default function Page() {
    const [settingsOpen, setSettingsOpen] = useState(true)
    const [storyNames, setStoryNames] = useState<string[]>([])
    const [storySelect, setStory] = useState<string>('')
    const [tagList, setTagList] = useState<string[]>([])
    const [tagSelect, setTag] = useState<string>('')
    const [commitList, setCommits] = useState<LogContent[]>([])
    const [nowQQNames, setQQs] = useState<string[]>([])
    const [qqMap, setQQMap] = useState<Map<string, qqInfo>>()
    const [qqChecked, setQCheck] = useState<string[]>([])
    useEffect(() => {
        if (!qqMap) {
            setQQMap(getQQSetting())
        }
    })
    if (storyNames.length === 0) {
        getStoryList().then(res => {
            setStoryNames(res.data as string[])
        })
    }
    const SelectStory = (event: SelectChangeEvent) => {
        setStory(event.target.value as string);
        getStoryTags(event.target.value).then(res => {
            res.data.tag_list.sort((a, b) => parseInt(a) - parseInt(b))
            setTagList(res.data.tag_list)
        })
    };
    const SelectTag = (event: SelectChangeEvent) => {
        setTag(event.target.value as string);
        getTagInnerList(storySelect, event.target.value).then(res => {
            const qqs = new Set<string>()
            res.data.DataList.forEach(v => {
                qqs.has(v.qq) || qqs.add(v.qq)
            })
            setQQs(Array.from(qqs))
            setQCheck(Array.from(qqs))

            setCommits(res.data.DataList)
        })
    };

    const [openQQSetting, setQQSet] = useState(false)
    const qqSetClose = () => setQQSet(false)
    const qqSetOpen = () => setQQSet(true)
    return (
        <div className="log-board">
            <Collapse in={settingsOpen}>
                <Paper elevation={3} className="control-board">
                    <Select
                        value={storySelect}
                        label="故事"
                        sx={{ width: 300, maxWidth: '100%' }}
                        onChange={SelectStory}
                    >
                        <MenuItem value=''>(空)</MenuItem>
                        {storyNames.map(v => (<MenuItem key={v} value={v}>{v}</MenuItem>))}
                    </Select>
                    <Select
                        value={tagSelect}
                        label="篇章"
                        sx={{ width: 300, maxWidth: '100%'  }}
                        onChange={SelectTag}
                    >
                        <MenuItem value=''>(空)</MenuItem>
                        {tagList.map(v => (<MenuItem key={v} value={v}>{new Date(parseInt(v) * 1000).toLocaleDateString()}</MenuItem>))}
                    </Select>
                    <Button variant="contained" onClick={qqSetOpen} disabled={!commitList.length}>修改昵称显示</Button>
                </Paper>
            </Collapse>
            <Dialog
                open={openQQSetting}
                onClose={qqSetClose}
                fullScreen
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        nowQQNames.forEach(v => {
                            console.log(formData.getAll(v))
                        })
                        console.log(formData.getAll('qqs'))
                        qqSetClose();
                    },
                }}

            >
                <DialogTitle>修改昵称显示</DialogTitle>
                <DialogContent
                >
                    <table>
                        <tr>
                            <th><div className="table-cell">qq</div></th>
                            <th><div className="table-cell">昵称</div></th>
                            <th><div className="table-cell">字体颜色</div></th>
                            <th><div className="table-cell">气泡颜色</div></th>
                            <th><div className="table-cell">是否显示</div></th>

                        </tr>
                        {
                            nowQQNames.map(v => {
                                const qqSetting = qqMap&&qqMap.has(v)&&qqMap.get(v)
                                return (qqSetting)?
                                qqSetContentDetail(v,qqSetting.name,qqSetting.color,qqSetting.bgColor):
                                qqSetContent(v)
                            })
                        }
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={qqSetClose}>取消</Button>
                    <Button type="submit">确认</Button>
                </DialogActions>
            </Dialog>
            <div className="log-content">
                {commitList.map(v =>
                    (<CommitBox key={v.time} name="" selected qq={v.qq} context={v.message} />)
                )}
                {/* <CommitBox selected name="你好" qq="271811917" context="您好" /> */}
            </div>
        </div>
    )
}

function CommitBox({ selected = false, qq, context, name, }: { selected: boolean, qq: string, context: string, name: string | undefined, }) {
    return (
        <div className="message-container">
            <div className="message-box">
                <span className="message-name">{name || qq}</span>
                <span className="message-content">{context}</span>
            </div>
            <Avatar className="message-advator" src={`http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=40`} />
        </div>
    )
}

type qqInfo = {
    qq: string
    name: string
    color: string
    bgColor: string
}
const qqSettingKey = 'qqSetting'
function getQQSetting() {
    const data = window.localStorage.getItem(qqSettingKey)
    if (data) {
        const arr = JSON.parse(data) as qqInfo[]
        return new Map<string, qqInfo>(arr.map(v => [v.qq, v]))
    } else {
        return new Map<string, qqInfo>()
    }
}
function setQQSetting(map: Map<string, qqInfo>) {
    const data = JSON.stringify(map.values())
    window.localStorage.setItem(qqSettingKey, data)
}

function qqSetContent(qq: string) {
    return (
        <tr>
            <td>
                <Avatar src={`http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=40`} />
                <span>{qq}</span>
            </td>
            <td>
                <input name={qq} />
            </td>
            <td>
                <input name={qq} type="color" defaultValue={'#000000'} />
            </td>
            <td>
                <input name={qq} type="color" defaultValue={'#ffffff'} />
            </td>
            <td>
                <input name="qqs" type="checkbox" value={qq} />
            </td>
        </tr>
    )
}

function qqSetContentDetail(qq: string,name: string,color:string,bgColor:string,) {
    return (
        <tr>
            <td>
                <Avatar src={`http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=40`} />
                <span>{qq}</span>
            </td>
            <td>
                <input name={qq} />
            </td>
            <td>
                <input name={qq} type="color" defaultValue={'#000000'} />
            </td>
            <td>
                <input name={qq} type="color" defaultValue={'#ffffff'} />
            </td>
            <td>
                <input name="qqs" type="checkbox" value={qq} defaultChecked={true}/>
            </td>
        </tr>
    )
}