import { contactStore } from '../store/contactStore';

export const identifyContactService = async (body: { email?: string; phoneNumber?: string }) => {
  const { email, phoneNumber } = body;
  if (!email && !phoneNumber) {
    throw new Error('Either email or phoneNumber is required');
  }

  let contacts = await contactStore.findContacts(email, phoneNumber);

  if (contacts.length === 0) {
    const newContact = await contactStore.createContact({
      email,
      phoneNumber,
      linkPrecedence: 'primary'
    });
    return {
      primaryContactId: newContact.id,
      emails: [newContact.email].filter(Boolean),
      phoneNumbers: [newContact.phoneNumber].filter(Boolean),
      secondaryContactIds: []
    };
  }

  let allContactIds = new Set(contacts.map((c: any) => c.id));
  let queue = [...contacts];
  while (queue.length > 0) {
    const current = queue.pop();
    const related = await contactStore.findRelatedContacts(current);
    for (const rel of related) {
      if (!allContactIds.has(rel.id)) {
        allContactIds.add(rel.id);
        queue.push(rel);
      }
    }
  }
  contacts = await contactStore.findContactsByIds(Array.from(allContactIds) as number[]);

  const primaryContact = contacts.find((c: any) => c.linkPrecedence === 'primary') || contacts[0];
  for (const contact of contacts) {
    if (contact.id !== primaryContact.id && contact.linkPrecedence === 'primary') {
      await contactStore.updateContact(contact.id, {
        linkPrecedence: 'secondary',
        linkedId: primaryContact.id
      });
    }
  }

  if (email && phoneNumber) {
    const emailExists = contacts.some((c: any) => c.email === email);
    const phoneExists = contacts.some((c: any) => c.phoneNumber === phoneNumber);
    if (emailExists && !phoneExists) {
      const newSecondary = await contactStore.createContact({
        email,
        phoneNumber,
        linkPrecedence: 'secondary',
        linkedId: primaryContact.id
      });
      contacts.push(newSecondary);
    }
  }

  const emails = [...new Set(contacts.map((c: any) => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(contacts.map((c: any) => c.phoneNumber).filter(Boolean))];
  const secondaryContactIds = contacts
    .filter((c: any) => c.id !== primaryContact.id)
    .map((c: any) => c.id);

  return {
    primaryContactId: primaryContact.id,
    emails,
    phoneNumbers,
    secondaryContactIds
  };
}; 