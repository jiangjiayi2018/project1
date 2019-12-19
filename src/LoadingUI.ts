//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.Component implements RES.PromiseTaskReporter {
    public proGroup: eui.Group;
    public loadBar: eui.Image;
    public tipText: eui.Label;

    private resolveFun: (value?: boolean | PromiseLike<boolean>) => void = null;


    public constructor() {
        super();
        this.skinName = "loading";
        
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    /**等待操作完成*/
    public waitHandle(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.resolveFun = resolve;
        });
    }

    /**结束等待状态*/
    private resolveHandle(): void {
        adapter.SoundManager.playMusic(sound.bg);
        adapter.Tween.removeTweens(this.tipText);
        if (this.resolveFun) {
            this.resolveFun(true);
            this.resolveFun = null;
        }
        adapter.UIWindow.getInstance().removeView(this);
    }

    private init(): void {
        this.loadBar.width = 0;
    }

    public onProgress(current: number, total: number): void {
        this.loadBar.width = current / total * 493;
        if (current >= total) {
            this.proGroup.visible = false;
            this.tipText.text = "进入游戏";
            this.tipText.anchorOffsetX = this.tipText.width * 0.5;
            this.tipText.anchorOffsetY = this.tipText.height * 0.5;
            adapter.tween(this.tipText).to({ scaleX: 1.1, scaleY: 1.1 }, 200).wait(50)
            .to({ scaleX: 0.9, scaleY: 0.9 }, 200).wait(50)
            .loop(-1);
            this.tipText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resolveHandle, this);
        }
    }



}
