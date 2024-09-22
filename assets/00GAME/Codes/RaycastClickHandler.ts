import { _decorator, Component, Camera, Vec2, PhysicsSystem, geometry, Node, EventMouse, input, Input, EventTouch, PhysicsSystem2D, Vec3, ERaycast2DType, EventKeyboard, KeyCode } from 'cc';
import { SlotManager } from './SlotManager';
import { SlotHandle } from './SlotHandle';
const { ccclass, property } = _decorator;

@ccclass('RaycastClickHandler')
export class RaycastClickHandler extends Component {

    @property(Camera)
    cam: Camera = null;  // Camera chính để thực hiện raycast

    onEnable() {
        
        input.on(Input.EventType.TOUCH_START, this.onMouseDown, this);
    }

    onDisable() {
        
        input.off(Input.EventType.TOUCH_END, this.onMouseDown, this);
    } 

    onMouseDown(event: EventTouch) {
        const mousePos = event.getLocation();   
        this.checkRaycast(mousePos);
    }
 

    checkRaycast(mousePos: Vec2) {
       
        const worldPos = this.cam.screenToWorld(new Vec3(mousePos.x, mousePos.y));
    
        
        const collider = PhysicsSystem2D.instance.testPoint(new Vec2(worldPos.x,worldPos.y));
    
        if (collider.length > 0) {
            SlotManager.getInstance<SlotManager>().selectSlot(collider[0].node.getComponent(SlotHandle));
            console.log("Đã click vào node:", collider[0].node.name);
        } else {
            console.log("Không có đối tượng nào bị click.");
            SlotManager.getInstance<SlotManager>().resetCurrentSelects();
        }
    }
    
}
