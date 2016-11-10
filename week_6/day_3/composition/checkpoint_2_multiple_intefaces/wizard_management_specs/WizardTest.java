import static org.junit.Assert.*;
import org.junit.*;
import wizard_management.*;

public class WizardTest {

  Wizard wizard;
  Broomstick broomstick;
  Ogre ogre;

  @Before
  public void before(){
    broomstick = new Broomstick("Nimbus", 10);
    ogre = new Ogre("Herbert");
    wizard = new Wizard("Toby", broomstick, ogre);
  }

  @Test
  public void hasName(){
    assertEquals("Toby", wizard.getName());
  }

  @Test
  public void hasRide(){
    assertNotNull(wizard.getRide());
  }

  @Test
  public void canFlyBroomstick(){
    assertEquals(wizard.fly(),"mounting broom, running, skipping, flying!");
  }

  @Test
  public void canFlyDragon(){
    Dragon dragon = new Dragon("Tilly");
    wizard = new Wizard("Toby", dragon);
    assertEquals(wizard.fly(),"Standing up tall, beating wings, lift off!");
  }

  @Test
  public void canFlyMagicCarpet(){
    MagicCarpet carpet = new MagicCarpet("Purple");
    wizard = new Wizard("Toby", carpet);
    assertEquals(wizard.fly(),"Hovering up, straightening out, flying off!");
  }

  @Test
  public void canSetRide(){
    Dragon dragon = new Dragon("Erik");
    wizard.setRide(dragon);
    assertEquals(wizard.fly(), "Standing up tall, beating wings, lift off!");
  }

  @Test
  public void canDefendItself(){
    assertEquals(wizard.defend(), "Hitting with a massive mace");
  }

  @Test
  public void canSetDefender(){
    Dragon dragon = new Dragon("Erik");
    wizard.setDefender(dragon);
    assertEquals(wizard.defend(), "Biting with sharp teeth");
  }
}