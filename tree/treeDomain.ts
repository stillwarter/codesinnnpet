let pendingTask: { (): void; (): void; (): void; (): void }[] = [];
let frameCount: number = 0;


// canve 画线初始化准备
export function drawLine(ctx: any, Point1x: any, Point1y: any, Point2x: any, Point2y: any) {
    var penColor = "rgba(190,190,190,0.4)";
    ctx.strokeStyle = penColor;
    ctx.beginPath();
    ctx.moveTo(Point1x, Point1y);
    ctx.lineTo(Point2x, Point2y);
    ctx.stroke();
}

// 获取下一个随机点A
export function getEndPoint(branch: any) {
    return {
        x: branch.startPointx + branch.length * Math.cos(branch.theta),
        y: branch.startPointy + branch.length * Math.sin(branch.theta),
    };
}

// 获取下一个随机点B
export function getEndPointRe(branch: any) {
    return {
        x: branch.startPointx - branch.length * Math.cos(branch.theta),
        y: branch.startPointy - branch.length * Math.sin(branch.theta),
    };
}

// 递归画线操作A
export function step( ctx: any, branch: any, depth: any) {
    const end = getEndPoint(branch);
    drawLine(ctx, branch.startPointx, branch.startPointy, end.x, end.y);
    const leftBranch = {
        startPointx: end.x,
        startPointy: end.y,
        length: 2.5 + (Math.random() * 10 - 5),
        theta: branch.theta - 0.2 * Math.random(),
    };
    const rightBranch = {
        startPointx: end.x,
        startPointy: end.y,
        length: 2.5 + (Math.random() * 10 - 5),
        theta: branch.theta + 0.2 * Math.random(),
    };
    if (Math.random() < 0.5 || depth < 6) {
        //this.step(ctx,leftBranch)
        pendingTask.push(() => {
            step( ctx, leftBranch, depth + 1);
        });
    }
    if (Math.random() < 0.5 || depth < 6) {
        //this.step(ctx,rightBranch)
        pendingTask.push(() => {
            step( ctx, rightBranch, depth + 1);
        });
    }
}

// 递归画线操作B
export function stepRe( ctx: any, branch: any, depth: any) {
    const end = getEndPointRe(branch);
    drawLine(ctx, branch.startPointx, branch.startPointy, end.x, end.y);
    const leftBranch = {
        startPointx: end.x,
        startPointy: end.y,
        length: 5 + (Math.random() * 10 - 5),
        theta: branch.theta - 0.2 * Math.random(),
    };
    const rightBranch = {
        startPointx: end.x,
        startPointy: end.y,
        length: 5 + (Math.random() * 10 - 5),
        theta: branch.theta + 0.2 * Math.random(),
    };
    if (Math.random() < 0.5 || depth < 6) {
        //this.step(ctx,leftBranch)
        pendingTask.push(() => {
            step(ctx, leftBranch, depth + 1);
        });
    }
    if (Math.random() < 0.5 || depth < 6) {
        //this.step(ctx,rightBranch)
        pendingTask.push(() => {
            step(ctx, rightBranch, depth + 1);
        });
    }
}

// 绘制二叉树结束后作画
export function frame() {
    const tasks = [...pendingTask];
    pendingTask.length = 0;
    tasks.forEach((fn) => fn());
}

// 作画的帧率优化
export function startFrame() {
    requestAnimationFrame(() => {
        frameCount += 1;
        if (frameCount % 4 === 0) {
            frame();
        }
        startFrame();
    });
    
}

// 结束作画
export function stopDraw() {
    pendingTask=[]
    frameCount=0
}