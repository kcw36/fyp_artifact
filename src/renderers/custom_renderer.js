import * as Blockly from 'blockly/core';

class CustomRenderer extends Blockly.blockRendering.Renderer {
    constructor() {
        super();
    }
    /**
     * @override
     */
    makeConstants_() {
        return new CustomConstantProvider();
    }
    /**
     * @override
     */
    makeDrawer_(block, info) {
        return new CustomDrawer(block, info);
    }
    /**
     * @override
     */
    makePathObject_(root, style) {
        return new customPathObject(root, style);
    }

    /**
     * @override
     */
    makeRenderInfo_(block) {
        return new customRenderInfo(this, block);
    }
}

// contains information for element size and spacing
class customRenderInfo extends Blockly.blockRendering.RenderInfo {
    /**
     * @override
     */
    constructor(renderer, block) {
        super(renderer, block);
    }

    /**
     * @override
     * returns an integer for space between two elements depending on the elements queried
     */
    getInRowSpacing_(prev, next) {
        const Types = Blockly.blockRendering.Types;
        if (!prev) {
            // Statement input padding.
            if (next && Types.isStatementInput(next)) {
                return this.constants_.STATEMENT_INPUT_PADDING_LEFT;
            }
        }
        // Between inputs and the end of the row.
        if (prev && Types.isInput(prev) && !next) {
            if (Types.isExternalInput(prev)) {
                return this.constants_.NO_PADDING;
            } else if (Types.isInlineInput(prev)) {
                return this.constants_.LARGE_PADDING;
            } else if (Types.isStatementInput(prev)) {
                return this.constants_.NO_PADDING;
            }
        }
    
        // Spacing between a square corner and a previous or next connection
        if (prev && Types.isLeftSquareCorner(prev) && next) {
            if (Types.isPreviousConnection(next) || Types.isNextConnection(next)) {
                return next.notchOffset;
            }
        }
    
        // Spacing between a rounded corner and a previous or next connection.
        if (prev && Types.isLeftRoundedCorner(prev) && next) {
            if (Types.isPreviousConnection(next) || Types.isNextConnection(next)) {
                return next.notchOffset - this.constants_.CORNER_RADIUS;
            }
        }

        // Spacing between a field and a next inline input.
        if (prev && Types.isField(prev) && next) {
            if (Types.isInlineInput(next)) {
                return this.constants_.NO_PADDING;
            }
        }
    
        return this.constants_.MEDIUM_PADDING;
    }
}

// contains block path information
class customPathObject extends Blockly.blockRendering.PathObject {
    /**
     * @override
     */
    constructor() {
        super();
    }
}

// draws the block path from the svg and render info
class CustomDrawer extends Blockly.blockRendering.Drawer {
     /**
     * @override
     */
    constructor(block, info) {
        super(block, info);
    }

    /**
     * @override
     * controls position of the field labels in a block
     */
    layoutField_(fieldInfo) {
        const yPos = fieldInfo.centerline - fieldInfo.height / 2 ;
        let xPos = fieldInfo.xPos;
        let scale = '';
        if (this.info_.RTL) {
            xPos = -(xPos + fieldInfo.width);
            if (fieldInfo.flipRtl) {
            xPos += fieldInfo.width;
            scale = 'scale(-1 1)';
            }
        }

        if (Blockly.blockRendering.Types.isIcon(fieldInfo)) {
            const icon = (fieldInfo).icon;
            icon.setOffsetInBlock(new Coordinate(xPos, yPos));
            if (this.info_.isInsertionMarker) {
            icon.hideForInsertionMarker();
            }
        } else {
            const svgGroup = (fieldInfo).field.getSvgRoot();
            svgGroup.setAttribute(
            'transform',
            'translate(' + xPos + ',' + yPos + ')' + scale,
            );
            if (this.info_.isInsertionMarker) {
            svgGroup.setAttribute('display', 'none');
            }
        }
    }

    /**
     * @override
     * controls position and size of the input value hole but nothing else
     */
    drawInlineInput_(input) {
        const width = input.width;
        const height = input.height;
        const yPos = input.centerline - height / 2;

        const connectionTop = input.connectionOffsetY;
        const connectionBottom = input.connectionHeight + connectionTop;
        const connectionRight = input.xPos + input.connectionWidth;

        this.inlinePath_ +=
            Blockly.utils.svgPaths.moveTo(connectionRight, yPos) +
            Blockly.utils.svgPaths.lineOnAxis('v', connectionTop) +
            (input.shape).pathDown +
            Blockly.utils.svgPaths.lineOnAxis('v', height - connectionBottom) +
            Blockly.utils.svgPaths.lineOnAxis('h', width - input.connectionWidth) +
            Blockly.utils.svgPaths.lineOnAxis('v', -height) +
            'z';

        this.positionInlineInputConnection_(input);
    }
}

// sets the constants used by the other methods inside the renderer
class CustomConstantProvider extends Blockly.blockRendering.ConstantProvider {
    /**
     * @override
     */
    constructor() {
        super();
        /**
         * @override
         */
        this.NOTCH_WIDTH = 20;
        /**
         * @override
         */
        this.NOTCH_HEIGHT = 5;
        /**
         * @override
         */
        this.CORNER_RADIUS = 0;
        /**
         * @override
         */
        this.TAB_HEIGHT = 0;
         /**
         * @override
         * padding around block contents
         */
        this.MEDIUM_PADDING = 5;
         /**
         * @override
         * distance from edge of block to start of notch
         */
        this.NOTCH_OFFSET_LEFT = 10;
    }

    init() {
        super.init();

        this.RECT_PREV_NEXT = this.makeRectangularPreviousConn();
        this.RECT_INPUT_OUTPUT = this.makeRectangularInputConn();
    }

    shapeFor(connection) {
        switch (connection.type) {
            case Blockly.INPUT_VALUE:
            case Blockly.OUTPUT_VALUE:
                return this.RECT_INPUT_OUTPUT;
            case Blockly.PREVIOUS_STATEMENT:
            case Blockly.NEXT_STATEMENT:
                return this.RECT_PREV_NEXT;
            default:
                throw Error('Uknown connection type');
        }
    }

    makeRectangularPreviousConn() {
        const width = this.NOTCH_WIDTH;
        const height = this.NOTCH_HEIGHT;

        function makeMainPath(dir) {
            return Blockly.utils.svgPaths.line(
                [
                    Blockly.utils.svgPaths.point(0,  height),
                    Blockly.utils.svgPaths.point(dir * width, 0),
                    Blockly.utils.svgPaths.point(0, -height),
                ]
            )
        }
        const pathLeft = makeMainPath(1);
        const pathRight = makeMainPath(-1);

        return {
            width: width,
            height: height,
            pathLeft: pathLeft,
            pathRight: pathRight,
        }
    }

    makeRectangularInputConn() {
        const width = this.TAB_WIDTH;
        const height = this.TAB_HEIGHT;

        function makeMainPath(dir) {
            return Blockly.utils.svgPaths.line(
                [
                    Blockly.utils.svgPaths.point(0, 0),
                    Blockly.utils.svgPaths.point(0, 0),
                    Blockly.utils.svgPaths.point(0, 0),
                ]
            )
        }
        const pathUp = makeMainPath(-1);
        const pathDown = makeMainPath(1);

        return {
            width: width,
            height: height,
            pathUp: pathUp,
            pathDown: pathDown,
        }
    }
}

Blockly.blockRendering.register('custom_renderer', CustomRenderer);